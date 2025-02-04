import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';
import { useUser } from '@/shared/hooks';

import { getServiceDetailAll } from '../../apis';

export const useGetServiceDetailAllQuery = () => {
  const { isAdmin } = useUser();

  return useQuery({
    queryKey: QUERY_KEYS.overview['work-status-all'].queryKey,
    queryFn: () => getServiceDetailAll(),
    enabled: isAdmin,
  });
};
