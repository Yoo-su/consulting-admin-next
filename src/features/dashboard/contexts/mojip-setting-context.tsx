'use client';

import { createContext, ReactNode, useState, useMemo, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DetailPageData } from '../types/detail-page-data.type';
import { useGetDetailPageDataQuery } from '../hooks/tanstack/use-get-detail-page-data-query';
import { useUnivService } from '../hooks/context/use-univ-service';

export type MojipSettingContextValue = {
  isPending: boolean;
  detailpageData: DetailPageData[] | undefined;
  hasChanges: boolean;
  addNewDetailpageRow: () => void;
  syncDetailpageData: () => void;
  updateRowMode: (rowNum: number, newMode: 'detail' | 'calc') => void;
  updateRowHtmlCard: (rowNum: number, newHtml: string) => void;
  updateCondition: (rowNum: number, newCondition: string) => void;
};

export const MojipSettingContext = createContext<MojipSettingContextValue | undefined>(undefined);

export type MojipSettingProviderProps = {
  children: ReactNode;
};

const MojipSettingProvider = ({ children }: MojipSettingProviderProps) => {
  const queryClient = useQueryClient();
  const { currentService } = useUnivService();
  const { data, isPending, isSuccess } = useGetDetailPageDataQuery(currentService?.serviceID);
  const [originalDetailData, setOriginalDetailData] = useState<DetailPageData[]>([]);

  // detailpage data 수정여부
  const hasChanges = useMemo(() => {
    if (!data || !originalDetailData.length) return false;
    const sortedDetailpageData = [...data].sort((a, b) => a.rowNum - b.rowNum),
      sortedOriginalDetailpageData = [...originalDetailData].sort((a, b) => a.rowNum - b.rowNum);
    return JSON.stringify(sortedDetailpageData) !== JSON.stringify(sortedOriginalDetailpageData);
  }, [data, originalDetailData]);

  // 수정 내역 존재 여부 체크를 위한 두 변수 동기화
  const syncDetailpageData = () => {
    if (data) setOriginalDetailData(data);
  };

  const addNewDetailpageRow = () => {
    let newRowNum: number = 0;
    if (!data?.length) newRowNum = 1;
    else newRowNum = Math.max(...Array.from(data, (item) => item.rowNum)) + 1;

    const newDetailpageRow = {
      serviceID: currentService?.serviceID ?? '',
      rowNum: newRowNum,
      condition: '[]',
      htmlCard: '',
      conditionText: '',
      mode: 'calc',
    };
    const newDatas = [...data!, newDetailpageRow];
    queryClient.setQueryData(['detail-page-data', currentService?.serviceID], () => {
      return newDatas;
    });
  };

  // 특정 행 mode 변경
  const updateRowMode = (rowNum: number, newMode: 'detail' | 'calc') => {
    queryClient.setQueryData(['detail-page-data', currentService?.serviceID ?? ''], (oldData: DetailPageData[]) => {
      return oldData.map((item) => {
        if (item.rowNum !== rowNum) return item;
        else
          return {
            ...item,
            mode: newMode,
          };
      });
    });
  };

  // 특정 행의 표시조건 전체 업데이트
  const updateCondition = (rowNum: number, newCondition: string) => {
    queryClient.setQueryData(['detail-page-data', currentService?.serviceID ?? ''], (oldData: DetailPageData[]) => {
      return oldData.map((item) => {
        if (item.rowNum !== rowNum) return item;
        else
          return {
            ...item,
            condition: newCondition,
          };
      });
    });
  };

  // 특정 행 htmlCard 변경
  const updateRowHtmlCard = (rowNum: number, newHtml: string) => {
    queryClient.setQueryData(['detail-page-data', currentService?.serviceID ?? ''], (oldData: DetailPageData[]) => {
      return oldData.map((item) => {
        if (item.rowNum !== rowNum) return item;
        else
          return {
            ...item,
            htmlCard: newHtml,
          };
      });
    });
  };

  useEffect(() => {
    if (data?.length) setOriginalDetailData(data);
  }, [isSuccess]);

  return (
    <MojipSettingContext.Provider
      value={{
        detailpageData: data,
        hasChanges,
        isPending,
        addNewDetailpageRow,
        syncDetailpageData,
        updateRowMode,
        updateRowHtmlCard,
        updateCondition,
      }}
    >
      {children}
    </MojipSettingContext.Provider>
  );
};

export default MojipSettingProvider;
