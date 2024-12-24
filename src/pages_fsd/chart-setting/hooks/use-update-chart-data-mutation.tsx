'use client';

import { useMutation } from '@tanstack/react-query';

import { updateChartData } from '../apis';
import { ChartData, useChartSettingStore } from '../models';

type MutationFnProps = {
  serviceID: string;
  chartData: ChartData[];
};
export const useUpdateChartDataMutation = () => {
  const { setCopiedChartData } = useChartSettingStore();
  return useMutation({
    mutationFn: ({ serviceID, chartData }: MutationFnProps) =>
      updateChartData(serviceID, chartData),
    onSuccess(data, variables, context) {
      setCopiedChartData(data);
    },
  });
};
