import { useQuery } from '@tanstack/react-query';

import { getServiceList } from '@/shared/apis';
import { QUERY_KEYS } from '@/shared/constants';

export const useGetServiceListQuery = (univID: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEYS.service['service-list'](univID!).queryKey,
    queryFn: () => getServiceList(univID!),
    enabled: !!univID,
  });
};
