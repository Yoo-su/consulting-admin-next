import { useQuery } from '@tanstack/react-query';
import { getDetailPageData } from '../../apis/get-detail-page-data';

export const useGetDetailPageDataQuery = (serviceID: string | undefined) => {
  return useQuery({
    queryKey: ['detail-page-data', serviceID],
    queryFn: () => getDetailPageData(serviceID!),
    enabled: !!serviceID,
  });
};
