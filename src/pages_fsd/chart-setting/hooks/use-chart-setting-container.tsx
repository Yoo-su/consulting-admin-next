import { Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { QUERY_KEYS } from '@/shared/constants';
import { useSharedStore } from '@/shared/models';

import { ChartData, useChartSettingStore } from '../models';
import { useUpdateChartDataMutation } from '.';
import { useGetChartDataQuery } from './use-get-chart-data-query';

export const useChartSettingState = () => {
  const queryClient = useQueryClient();
  const { currentService } = useSharedStore();
  const { data: chartData, isLoading: isChartDataLoading } =
    useGetChartDataQuery(currentService?.serviceID ?? '');
  const { mutateAsync: updateChartData } = useUpdateChartDataMutation();
  const { copiedChartData } = useChartSettingStore();

  // 변경사항 유무
  const hasChanges = useMemo(() => {
    const sortedOriginalData = [...copiedChartData].sort(
        (a, b) => a.modelNum - b.modelNum
      ),
      sortedChartData = [...chartData].sort((a, b) => a.modelNum - b.modelNum);
    return (
      JSON.stringify(sortedOriginalData) !== JSON.stringify(sortedChartData)
    );
  }, [chartData, copiedChartData]);

  // 모델 번호 목록
  const modelNumbers = useMemo(() => {
    return Array.from(new Set(chartData.map((item) => item.modelNum))).sort(
      (a, b) => a - b
    );
  }, [chartData]);

  const addNewModel = useCallback(() => {
    const newModelNum = chartData.length ? Math.max(...modelNumbers) + 1 : 0;
    const newChartData: ChartData[] = [
      ...chartData,
      {
        serviceID: currentService?.serviceID ?? '',
        modelNum: newModelNum,
        label: '새 레이블',
        percentage: 100,
        level: 1,
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
  }, [chartData]);

  const handleSaveBtnClick = useCallback(() => {
    toast.promise(
      updateChartData({
        serviceID: currentService?.serviceID ?? '',
        chartData: chartData,
      }),
      {
        loading: (
          <Typography variant="body2">
            차트 정보를 업데이트하는 중입니다...
          </Typography>
        ),
        success: (
          <Typography variant="body2">차트정보 업데이트 완료!</Typography>
        ),
        error: (
          <Typography variant="body2">
            차트정보 업데이트 중 문제가 발생했습니다
          </Typography>
        ),
      }
    );
  }, [chartData]);

  return {
    chartData,
    isChartDataLoading,
    modelNumbers,
    hasChanges,
    handleSaveBtnClick,
    addNewModel,
  };
};
