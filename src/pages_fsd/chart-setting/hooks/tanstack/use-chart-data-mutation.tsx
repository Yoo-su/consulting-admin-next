'use client';

import { Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';

import { QUERY_KEYS } from '@/shared/constants';
import { useSharedStore } from '@/shared/models';

import { updateChartData } from '../../apis';
import { ChartData } from '../../models';

type UseChartDataMutationReturn = {
  isPostChartDataLoading: boolean;
  isPostChartDataSuccess: boolean;
  postChartData: (chartData: ChartData[]) => Promise<unknown>;
  setChartData: (newData: ChartData[]) => void;
};

type UseChartDataMutation = () => UseChartDataMutationReturn;

export const useChartDataMutation: UseChartDataMutation = () => {
  const _return = useRef({} as UseChartDataMutationReturn);
  const queryClient = useQueryClient();
  const currentService = useSharedStore((state) => state.currentService);
  const serviceID = currentService?.serviceID ?? '';

  const {
    mutateAsync: postChartData,
    isPending: isPostChartDataLoading,
    isSuccess: isPostChartDataSuccess,
  } = useMutation({
    mutationFn: (chartData: ChartData[]) =>
      updateChartData(serviceID, chartData),
    onSuccess: () => {
      toast.success(
        <Typography variant="caption">차트정보 업데이트 완료!</Typography>
      );
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        <Typography variant="caption">
          차트정보 업데이트 중 문제가 발생했습니다
        </Typography>
      );
    },
  });

  const setChartData = useCallback(
    (newData: ChartData[]) => {
      queryClient.setQueryData(
        QUERY_KEYS['chart-setting']['chart-data'](serviceID).queryKey,
        () => {
          return newData;
        }
      );
    },
    [serviceID]
  );

  _return.current = {
    isPostChartDataLoading,
    isPostChartDataSuccess,
    postChartData,
    setChartData,
  };

  return _return.current;
};
