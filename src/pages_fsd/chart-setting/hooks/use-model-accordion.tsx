'use client';

import { useCallback, useMemo, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

import { useConfirmToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { ChartData, useChartSettingStore } from '../models';
import { useChartDataMutation } from './use-chart-data-mutation';
import { useGetChartDataQuery } from './use-get-chart-data-query';

type UseModelAccordionProps = {
  modelNum: number;
};
type UseModelAccordionReturn = {
  isExpanded: boolean;
  modelChartData: ChartData[];
  modelLevels: number[];
  handleClickAccordionTitle: () => void;
  handleClickDeleteModelBtn: () => void;
  handleClickAddNewLevelBtn: () => void;
};
export const useModelAccordion = ({ modelNum }: UseModelAccordionProps) => {
  const _return = useRef<UseModelAccordionReturn>();
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
  const handleClickAccordionTitle = useCallback(() => {
    if (selectedModel === modelNum) setSelectedModel(null);
    else setSelectedModel(modelNum);
  }, [selectedModel, modelNum]);

  const handleClickDeleteModelBtn = useCallback(() => {
    openConfirmToast({
      message: `${modelNum + 1}번 모델을 삭제하시겠습니까?`,
      callbackConfirm: () => {
        const newChartData = [...(chartData ?? [])].filter(
          (item) => item.modelNum !== modelNum
        );
        setChartData(newChartData);
      },
    });
  }, [chartData, modelNum]);

  const handleClickAddNewLevelBtn = useCallback(() => {
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

  _return.current = {
    isExpanded,
    modelChartData,
    modelLevels,
    handleClickAccordionTitle,
    handleClickDeleteModelBtn,
    handleClickAddNewLevelBtn,
  };
  return _return.current;
};
