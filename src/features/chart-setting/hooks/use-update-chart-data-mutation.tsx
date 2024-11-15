'use client';

import { useMutation } from '@tanstack/react-query';

import { updateChartData } from '../apis';
import { ChartData } from '../models';

type MutationFnProps = {
  serviceID: string;
  chartData: ChartData[];
};
export const useUpdateChartDataMutation = () => {
  return useMutation({
    mutationFn: ({ serviceID, chartData }: MutationFnProps) =>
      updateChartData(serviceID, chartData),
  });
};
