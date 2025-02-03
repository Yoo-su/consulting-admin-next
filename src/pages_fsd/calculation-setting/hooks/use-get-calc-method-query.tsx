import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getCalcMethod } from '../apis';

export const useGetCalcMethodQuery = (serviceID: string) => {
  return useQuery({
    queryFn: () => getCalcMethod(serviceID),
    queryKey: QUERY_KEYS['calculation-setting']['calc-method'](serviceID).queryKey,
    enabled: !!serviceID,
  });
};
