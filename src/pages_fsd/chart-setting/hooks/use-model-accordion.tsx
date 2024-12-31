'use client';

import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useConfirmToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { useChartSettingStore } from '../models';
import { useChartDataMutation } from './use-chart-data-mutation';
import { useGetChartDataQuery } from './use-get-chart-data-query';

type UseModelAccordionProps = {
  modelNum: number;
};
export const useModelAccordion = ({ modelNum }: UseModelAccordionProps) => {
  const currentService = useSharedStore((state) => state.currentService);
  const { selectedModel, setSelectedModel } = useChartSettingStore(
    useShallow((state) => ({
      selectedModel: state.selectedModel,
      setSelectedModel: state.setSelectedModel,
    }))
  );
  const { data: chartData } = useGetChartDataQuery(
    currentService?.serviceID ?? ''
  );
  const { setChartData } = useChartDataMutation();
  const { openConfirmToast } = useConfirmToast();

  // #region memoized values
  const isExpanded = useMemo(
    () => selectedModel === modelNum,
    [selectedModel, modelNum]
  );
  const modelChartData = useMemo(() => {
    return chartData?.filter((item) => item.modelNum === modelNum) ?? [];
  }, [chartData, modelNum]);

  const modelLevels = useMemo(() => {
    return Array.from(new Set(modelChartData.map((item) => item.level)));
  }, [modelChartData]);
  // #endregion

  // #region methods
  const handleClickTitle = useCallback(() => {
    if (selectedModel === modelNum) setSelectedModel(null);
    else setSelectedModel(modelNum);
  }, [selectedModel, modelNum]);

  const handleClickDelete = useCallback(() => {
    openConfirmToast(`${modelNum + 1}번 모델을 삭제하시겠습니까?`, () => {
      const newChartData = [...(chartData ?? [])].filter(
        (item) => item.modelNum !== modelNum
      );
      setChartData(newChartData);
    });
  }, [chartData, modelNum]);

  const addNewModelLevel = useCallback(() => {
    const newLevel = modelLevels.length ? Math.max(...modelLevels) + 1 : 1;
    const newChartData = [
      ...(chartData ?? []),
      {
        serviceID: currentService?.serviceID ?? '',
        modelNum,
        label: '새 레이블',
        percentage: 100,
        level: newLevel,
        chartLabel: '새 차트 레이블',
      },
    ];
    setChartData(newChartData);
  }, [modelLevels, modelNum]);
  // #endregion

  return {
    isExpanded,
    modelChartData,
    modelLevels,
    handleClickTitle,
    handleClickDelete,
    addNewModelLevel,
  };
};
