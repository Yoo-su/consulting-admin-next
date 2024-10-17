import { useQuery } from '@tanstack/react-query';
import { getConsultingAppState } from '../apis';

export const useGetConsultingAppStateQuery = () => {
  return useQuery({
    queryKey: ['consultingAppState'],
    queryFn: () => getConsultingAppState(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
