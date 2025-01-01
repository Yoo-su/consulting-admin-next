'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getChartData } from '../apis';

export const useGetChartDataQuery = (serviceID: string) => {
  return useQuery({
    queryKey: QUERY_KEYS['chart-setting']['chart-data'](serviceID).queryKey,
    queryFn: () => getChartData(serviceID),
    enabled: !!serviceID,
  });
};
