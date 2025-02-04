import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getServiceDetail } from '../../apis';

export const useGetServiceDetailQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.overview['work-status'].queryKey,
    queryFn: () => getServiceDetail(),
  });
};
