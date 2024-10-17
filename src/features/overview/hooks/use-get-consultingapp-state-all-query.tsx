import { useQuery } from '@tanstack/react-query';
import { getConsultingAppStateAll } from '../apis';

export const useGetConsultingAppStateAllQuery = () => {
  return useQuery({
    queryKey: ['consultingAppStateAll'],
    queryFn: () => getConsultingAppStateAll(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
