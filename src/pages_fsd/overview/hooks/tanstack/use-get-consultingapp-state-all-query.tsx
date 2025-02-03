import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';
import { useUser } from '@/shared/hooks';

import { getConsultingAppStateAll } from '../../apis';

export const useGetConsultingAppStateAllQuery = () => {
  const { isAdmin } = useUser();

  return useQuery({
    queryKey: QUERY_KEYS.overview['work-status-all'].queryKey,
    queryFn: () => getConsultingAppStateAll(),
    enabled: isAdmin,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });
};
