'use client';

import { useMutation } from '@tanstack/react-query';
import { updateChartData } from '../../apis/update-chart-data';
import { ChartData } from '../../types/chart-data.type';

type MutationFnProps = {
  serviceID: string;
  chartData: ChartData[];
};
export const useUpdateChartDataMutation = () => {
  return useMutation({
    mutationFn: ({ serviceID, chartData }: MutationFnProps) => updateChartData(serviceID, chartData),
  });
};
