import { useQuery } from '@tanstack/react-query';
import { getServiceList } from '../../apis/get-service-list';

export const useGetServiceListQuery = (univID: string | undefined) => {
  return useQuery({
    queryKey: ['service-list', univID],
    queryFn: () => getServiceList(univID!),
    enabled: !!univID,
  });
};
