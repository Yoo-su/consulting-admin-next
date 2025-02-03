'use client';

import { useCallback, useMemo, useRef } from 'react';

import { useConfirmToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { ChartData, useChartSettingStore } from '../models';
import { getDistinctColumnValues, getNewChartData, getNewNumberColumnValue } from '../utils';
import { useChartDataMutation, useGetChartDataQuery } from './tanstack';

type UseModelAccordionProps = {
  modelNum: number;
};
type UseModelAccordionReturn = {
  isExpanded: boolean;
  modelChartData: ChartData[];
  modelLevels: number[];
  handleClickAccordionTitle: () => void;
  handleDeleteModel: () => void;
  handleAddNewLevel: () => void;
};
export const useModelAccordion = ({ modelNum }: UseModelAccordionProps) => {
  const _return = useRef<UseModelAccordionReturn>();
  const currentService = useSharedStore((state) => state.currentService);
  const serviceID = currentService?.serviceID ?? '';
  const selectedModel = useChartSettingStore((state) => state.selectedModel);
  const setSelectedModel = useChartSettingStore((state) => state.setSelectedModel);
  const { data: chartDatas } = useGetChartDataQuery(serviceID);
  const { setChartData } = useChartDataMutation();
  const { openConfirmToast } = useConfirmToast();

  // #region memoized values
  const isExpanded = useMemo(() => selectedModel === modelNum, [selectedModel, modelNum]);
  const modelChartData = useMemo(() => {
    return chartDatas?.filter((item) => item.modelNum === modelNum) ?? [];
  }, [chartDatas, modelNum]);

  const modelLevels = useMemo(() => {
    return getDistinctColumnValues(modelChartData, 'level') as number[];
  }, [modelChartData]);
  // #endregion

  // #region methods
  const handleClickAccordionTitle = useCallback(() => {
    if (selectedModel === modelNum) setSelectedModel(null);
    else setSelectedModel(modelNum);
  }, [selectedModel, modelNum]);

  const handleDeleteModel = useCallback(() => {
    openConfirmToast({
      message: `${modelNum + 1}번 모델을 삭제하시겠습니까?`,
      callbackConfirm: () => {
        const newChartData = [...(chartDatas ?? [])].filter((item) => item.modelNum !== modelNum);
        setChartData(newChartData);
      },
    });
  }, [chartDatas, modelNum]);

  const handleAddNewLevel = useCallback(() => {
    const newLevel = getNewNumberColumnValue(modelChartData, 'level', 1);
    const newChartData = [
      ...(chartDatas ?? []),
      getNewChartData({
        serviceID,
        modelNum: modelNum,
        level: newLevel,
      }),
    ];
    setChartData(newChartData);
  }, [modelChartData, modelNum]);
  // #endregion

  _return.current = {
    isExpanded,
    modelChartData,
    modelLevels,
    handleClickAccordionTitle,
    handleDeleteModel,
    handleAddNewLevel,
  };
  return _return.current;
};
