'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useUnivService } from '@/shared/hooks/context';

import { useGetDetailPageDataQuery } from '../hooks';
import { DetailPageData } from '../models';

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

export const MojipSettingContext = createContext<
  MojipSettingContextValue | undefined
>(undefined);

export type MojipSettingProviderProps = {
  children: ReactNode;
};

const MojipSettingProvider = ({ children }: MojipSettingProviderProps) => {
  const queryClient = useQueryClient();
  const { currentService } = useUnivService();
  const { data, isPending, isSuccess } = useGetDetailPageDataQuery(
    currentService?.serviceID
  );
  const [originalDetailData, setOriginalDetailData] = useState<
    DetailPageData[]
  >([]);

  // detailpage data 수정여부
  const hasChanges = useMemo(() => {
    if (!data) return false;
    const sortedDetailpageData = [...data].sort((a, b) => a.rowNum - b.rowNum),
      sortedOriginalDetailpageData = [...originalDetailData].sort(
        (a, b) => a.rowNum - b.rowNum
      );
    return (
      JSON.stringify(sortedDetailpageData) !==
      JSON.stringify(sortedOriginalDetailpageData)
    );
  }, [data, originalDetailData]);

  // 수정 내역 존재 여부 체크를 위한 두 변수 동기화
  const syncDetailpageData = () => {
    if (data) setOriginalDetailData(data);
  };

  const addNewDetailpageRow = useCallback(() => {
    queryClient.setQueryData(
      ['detail-page-data', currentService?.serviceID],
      (oldData: DetailPageData[]) => {
        const newRowNum: number = oldData?.length
          ? Math.max(...oldData.map((item) => item.rowNum)) + 1
          : 1;

        const newDetailpageRow = {
          serviceID: currentService?.serviceID ?? '',
          rowNum: newRowNum,
          condition: '[]',
          htmlCard: '',
          conditionText: '',
          mode: 'calc',
        };
        return [...oldData, newDetailpageRow];
      }
    );
  }, [currentService]);

  // 특정 행 mode 변경
  const updateRowMode = useCallback(
    (rowNum: number, newMode: 'detail' | 'calc') => {
      queryClient.setQueryData(
        ['detail-page-data', currentService?.serviceID ?? ''],
        (oldData: DetailPageData[]) => {
          return oldData.map((item) => {
            if (item.rowNum !== rowNum) return item;
            else
              return {
                ...item,
                mode: newMode,
              };
          });
        }
      );
    },
    [currentService]
  );

  // 특정 행의 표시조건 전체 업데이트
  const updateCondition = useCallback(
    (rowNum: number, newCondition: string) => {
      queryClient.setQueryData(
        ['detail-page-data', currentService?.serviceID ?? ''],
        (oldData: DetailPageData[]) => {
          return oldData.map((item) => {
            if (item.rowNum !== rowNum) return item;
            else
              return {
                ...item,
                condition: newCondition,
              };
          });
        }
      );
    },
    [currentService]
  );

  // 특정 행 htmlCard 변경
  const updateRowHtmlCard = useCallback(
    (rowNum: number, newHtml: string) => {
      queryClient.setQueryData(
        ['detail-page-data', currentService?.serviceID ?? ''],
        (oldData: DetailPageData[]) => {
          return oldData.map((item) => {
            if (item.rowNum !== rowNum) return item;
            else
              return {
                ...item,
                htmlCard: newHtml,
              };
          });
        }
      );
    },
    [currentService]
  );

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
