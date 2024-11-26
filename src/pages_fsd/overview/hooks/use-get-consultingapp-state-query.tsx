import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getConsultingAppState } from '../apis';

export const useGetConsultingAppStateQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.overview['work-status'].queryKey,
    queryFn: () => getConsultingAppState(),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });
};
