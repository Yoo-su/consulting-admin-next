import { useCallback, useRef } from 'react';

import { useConfirmToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { Mode, useDetailPageSettingStore } from '../models';
import {
  useDetailPageSettingMutation,
  useGetDetailPageDataQuery,
} from './tanstack';

type UseHandleDetailPageDataReturn = {
  handleDeleteData: (rowNumber: number) => void;
  handleUpdateMode: (rowNumber: number, newMode: Mode) => void;
  handleUpdateCondition: (rowNumber: number, newCondition: string) => void;
  handleUpdateHtmlCard: (rowNumber: number, newHtmlCard: string) => void;
};
type UseHandleDetailPageData = () => UseHandleDetailPageDataReturn;
export const useHandleDetailPageData: UseHandleDetailPageData = () => {
  const _return = useRef({} as UseHandleDetailPageDataReturn);
  const currentService = useSharedStore((state) => state.currentService);
  const setSelectedRowNumber = useDetailPageSettingStore(
    (state) => state.setSelectedRowNumber
  );
  const { data: detailPageDatas } = useGetDetailPageDataQuery(
    currentService?.serviceID
  );
  const { setDetailPageData } = useDetailPageSettingMutation();
  const { openConfirmToast } = useConfirmToast();

  // row 데이터 삭제
  const handleDeleteData = useCallback(
    (rowNumber: number) => {
      openConfirmToast({
        message: `${rowNumber}번 데이터를 삭제하시겠습니까?`,
        callbackConfirm: () => {
          const filteredData =
            detailPageDatas?.filter((item) => item.rowNum !== rowNumber) ?? [];
          setDetailPageData(filteredData);
          setSelectedRowNumber(null);
        },
      });
    },
    [detailPageDatas]
  );

  // 특정 행 mode 변경
  const handleUpdateMode = useCallback(
    (rowNumber: number, newMode: Mode) => {
      const newDetailPageData = (detailPageDatas ?? []).map((item) => {
        if (item.rowNum !== rowNumber) return item;
        return {
          ...item,
          mode: newMode,
        };
      });
      setDetailPageData(newDetailPageData);
    },
    [detailPageDatas]
  );

  // 특정 행 Condition 변경
  const handleUpdateCondition = useCallback(
    (rowNumber: number, newCondition: string) => {
      const newDetailPageData = (detailPageDatas ?? []).map((item) => {
        if (item.rowNum !== rowNumber) return item;
        return {
          ...item,
          condition: newCondition,
        };
      });
      setDetailPageData(newDetailPageData);
    },
    [detailPageDatas]
  );

  // 특정 행 htmlCard 변경
  const handleUpdateHtmlCard = useCallback(
    (rowNumber: number, newHtmlCard: string) => {
      const newDetailPageData = (detailPageDatas ?? []).map((item) => {
        if (item.rowNum !== rowNumber) return item;
        return {
          ...item,
          htmlCard: newHtmlCard,
        };
      });
      setDetailPageData(newDetailPageData);
    },
    [detailPageDatas]
  );

  _return.current = {
    handleDeleteData,
    handleUpdateCondition,
    handleUpdateHtmlCard,
    handleUpdateMode,
  };
  return _return.current;
};
