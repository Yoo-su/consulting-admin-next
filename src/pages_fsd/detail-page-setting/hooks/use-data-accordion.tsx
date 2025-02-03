import { useCallback, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

import { useConfirmToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { Mode, useDetailPageSettingStore } from '../models';
import { useDetailPageSettingMutation, useGetDetailPageDataQuery } from './tanstack';

type UseDataAccordionReturn = {
  isSelected: boolean;
  handleClickTitle: () => void;
  handleDeleteData: () => void;
  handleUpdateMode: (newMode: Mode) => void;
  handleUpdateHtmlCard: (newHtmlCard: string) => void;
};
type UseDataAccordion = (rowNumber: number) => UseDataAccordionReturn;
export const useDataAccordion: UseDataAccordion = (rowNumber: number) => {
  const _return = useRef({} as UseDataAccordionReturn);
  const currentService = useSharedStore((state) => state.currentService);
  const serviceID = currentService?.serviceID ?? '';
  const [selectedRowNumber, setSelectedRowNumber] = useDetailPageSettingStore(
    useShallow((state) => [state.selectedRowNumber, state.setSelectedRowNumber])
  );
  const { data: detailPageDatas } = useGetDetailPageDataQuery(serviceID);
  const { setDetailPageData } = useDetailPageSettingMutation();
  const { openConfirmToast } = useConfirmToast();

  // 현재 데이터의 선택 여부
  const isSelected = selectedRowNumber === rowNumber;

  // 아코디언 타이틀 클릭 처리(선택, 선택해제)
  const handleClickTitle = useCallback(() => {
    if (!isSelected) setSelectedRowNumber(rowNumber);
    else setSelectedRowNumber(null);
  }, [isSelected]);

  // row 데이터 삭제
  const handleDeleteData = useCallback(() => {
    openConfirmToast({
      message: `${rowNumber}번 데이터를 삭제하시겠습니까?`,
      callbackConfirm: () => {
        const filteredData = detailPageDatas?.filter((item) => item.rowNum !== rowNumber) ?? [];
        setDetailPageData(filteredData);
        setSelectedRowNumber(null);
      },
    });
  }, [detailPageDatas, rowNumber]);

  // 특정 행 mode 변경
  const handleUpdateMode = useCallback(
    (newMode: Mode) => {
      const newDetailPageData = (detailPageDatas ?? []).map((item) => {
        if (item.rowNum !== rowNumber) return item;
        return {
          ...item,
          mode: newMode,
        };
      });
      setDetailPageData(newDetailPageData);
    },
    [detailPageDatas, rowNumber]
  );

  // 특정 행 htmlCard 변경
  const handleUpdateHtmlCard = useCallback(
    (newHtmlCard: string) => {
      const newDetailPageData = (detailPageDatas ?? []).map((item) => {
        if (item.rowNum !== rowNumber) return item;
        return {
          ...item,
          htmlCard: newHtmlCard,
        };
      });
      setDetailPageData(newDetailPageData);
    },
    [detailPageDatas, rowNumber]
  );

  _return.current = {
    isSelected,
    handleClickTitle,
    handleDeleteData,
    handleUpdateHtmlCard,
    handleUpdateMode,
  };
  return _return.current;
};
