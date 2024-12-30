'use client';

import { Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { useSharedStore } from '@/shared/models';

import { ChartData, useChartSettingStore } from '../models';
import { useChartDataMutation } from './use-chart-data-mutation';
import { useGetChartDataQuery } from './use-get-chart-data-query';

export const useChartSettingContainer = () => {
  const { currentService } = useSharedStore();
  const {
    data: chartData,
    isLoading: isChartDataLoading,
    isSuccess,
  } = useGetChartDataQuery(currentService?.serviceID ?? '');
  const { setChartData, postChartData } = useChartDataMutation();
  const { copiedChartData, setCopiedChartData } = useChartSettingStore();

  const isChartDataExist = useMemo(
    () => (chartData?.length ?? 0) > 0,
    [chartData]
  );

  // 변경사항 유무
  const hasChanges = useMemo(() => {
    const sortedOriginalData = [...copiedChartData].sort(
        (a, b) => a.modelNum - b.modelNum
      ),
      sortedChartData = [...(chartData ?? [])].sort(
        (a, b) => a.modelNum - b.modelNum
      );
    return (
      JSON.stringify(sortedOriginalData) !== JSON.stringify(sortedChartData)
    );
  }, [chartData, copiedChartData]);

  // 모델 번호 목록
  const modelNumbers = useMemo(() => {
    return Array.from(
      new Set((chartData ?? []).map((item) => item.modelNum))
    ).sort((a, b) => a - b);
  }, [chartData]);

  const addNewModel = () => {
    const newModelNum = chartData?.length ? Math.max(...modelNumbers) + 1 : 0;
    const newChartData: ChartData[] = [
      ...(chartData ?? []),
      {
        serviceID: currentService?.serviceID ?? '',
        modelNum: newModelNum,
        label: '새 레이블',
        percentage: 100,
        level: 1,
        chartLabel: '새 차트 레이블',
      },
    ];
    setChartData(newChartData);
  };

  const handleSaveBtnClick = useCallback(() => {
    toast.promise(
      postChartData({
        serviceID: currentService?.serviceID ?? '',
        chartData: chartData ?? [],
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

  useEffect(() => {
    if (chartData) setCopiedChartData([...chartData]);
  }, [isSuccess]);

  return {
    chartData,
    isChartDataExist,
    isChartDataLoading,
    modelNumbers,
    hasChanges,
    handleSaveBtnClick,
    addNewModel,
  };
};
