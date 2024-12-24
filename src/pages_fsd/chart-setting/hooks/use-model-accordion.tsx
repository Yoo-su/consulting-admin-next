import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { QUERY_KEYS } from '@/shared/constants';
import { useConfirmToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { useChartSettingStore } from '../models';
import { useGetChartDataQuery } from './use-get-chart-data-query';

type UseModelAccordionProps = {
  modelNum: number;
};
export const useModelAccordion = ({ modelNum }: UseModelAccordionProps) => {
  const queryClient = useQueryClient();
  const { currentService } = useSharedStore();
  const { selectedModel, setSelectedModel } = useChartSettingStore((state) => ({
    selectedModel: state.selectedModel,
    setSelectedModel: state.setSelectedModel,
  }));
  const { data: chartData } = useGetChartDataQuery(
    currentService?.serviceID ?? ''
  );
  const { openConfirmToast } = useConfirmToast();

  // #region memoized values
  const isExpanded = useMemo(() => selectedModel === modelNum, [selectedModel]);
  const modelChartData = useMemo(() => {
    return chartData.filter((item) => item.modelNum === modelNum);
  }, [chartData]);

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
      queryClient.setQueryData(
        QUERY_KEYS['chart-setting']['chart-data'](
          currentService?.serviceID ?? ''
        ).queryKey,
        (oldData: any) => {
          return oldData.filter((item: any) => item.modelNum !== modelNum);
        }
      );
    });
  }, [modelNum]);

  const addNewModelLevel = useCallback(() => {
    const newLevel = modelLevels.length ? Math.max(...modelLevels) + 1 : 1;
    const newChartData = [
      ...chartData,
      {
        serviceID: currentService?.serviceID ?? '',
        modelNum,
        label: '새 레이블',
        percentage: 100,
        level: newLevel,
        chartLabel: '새 차트 레이블',
      },
    ];
    queryClient.setQueryData(
      QUERY_KEYS['chart-setting']['chart-data'](currentService?.serviceID ?? '')
        .queryKey,
      () => {
        return newChartData;
      }
    );
  }, []);
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
