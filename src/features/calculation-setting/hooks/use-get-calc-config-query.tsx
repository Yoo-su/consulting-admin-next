import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getCalcConfig } from '../apis';

export const useGetCalcConfigQuery = (serviceID: string) => {
  return useQuery({
    queryFn: () => getCalcConfig(serviceID),
    queryKey:
      QUERY_KEYS['calculation-setting']['calc-config'](serviceID).queryKey,
  });
};
