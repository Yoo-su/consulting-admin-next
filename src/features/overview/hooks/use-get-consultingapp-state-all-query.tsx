import { useQuery } from '@tanstack/react-query';
import { getConsultingAppStateAll } from '../apis';
import { useUser } from '@/shared/hooks/context';

export const useGetConsultingAppStateAllQuery = () => {
  const { isAdmin } = useUser();

  return useQuery({
    queryKey: ['consultingAppStateAll'],
    queryFn: () => getConsultingAppStateAll(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: isAdmin,
  });
};
