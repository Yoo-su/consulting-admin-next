import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getConversionTable } from '../apis';

export const useGetCalcConversionTableQuery = (serviceID: string) => {
  return useQuery({
    queryFn: () => getConversionTable(serviceID),
    queryKey:
      QUERY_KEYS['calculation-setting']['conversion-table'](serviceID).queryKey,
    enabled: !!serviceID,
  });
};
