'use client';

import { useMutation } from '@tanstack/react-query';
import { updateChartData } from '../../apis/update-chart-data';
import { useUnivService } from '../context/use-univ-service';
import { useChartSetting } from '../context/use-chart-setting';

export const useUpdateChartDataMutation = () => {
  const { currentService } = useUnivService();
  const { chartData } = useChartSetting();
  return useMutation({
    mutationFn: () => updateChartData(currentService?.serviceID ?? '', chartData),
  });
};
