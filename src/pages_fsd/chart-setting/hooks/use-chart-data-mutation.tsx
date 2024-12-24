import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

import { QUERY_KEYS } from '@/shared/constants';
import { useSharedStore } from '@/shared/models';

import { updateChartData } from '../apis';
import { ChartData, useChartSettingStore } from '../models';

type PostChartDataParams = {
  serviceID: string;
  chartData: ChartData[];
};

type UseChartDataMutationReturn = {
  isPostChartDataLoading: boolean;
  postChartData: ({ serviceID, chartData }: PostChartDataParams) => void;
  setChartData: (newData: ChartData[]) => void;
};

type UseChartDataMutation = () => UseChartDataMutationReturn;

export const useChartDataMutation: UseChartDataMutation = () => {
  const queryClient = useQueryClient();
  const { currentService } = useSharedStore();
  const { setCopiedChartData } = useChartSettingStore();

  const _return = useRef({} as UseChartDataMutationReturn);

  const { mutateAsync: postChartData, isPending: isPostChartDataLoading } =
    useMutation({
      mutationFn: ({ serviceID, chartData }: PostChartDataParams) =>
        updateChartData(serviceID, chartData),
      onSuccess: (data) => {
        setCopiedChartData(data);
      },
      onError: (err) => {
        console.error(err);
      },
    });

  const setChartData = useCallback((newData: ChartData[]) => {
    queryClient.setQueryData(
      QUERY_KEYS['chart-setting']['chart-data'](currentService?.serviceID ?? '')
        .queryKey,
      newData
    );
  }, []);

  _return.current.isPostChartDataLoading = isPostChartDataLoading;
  _return.current.postChartData = postChartData;
  _return.current.setChartData = setChartData;

  return _return.current;
};
