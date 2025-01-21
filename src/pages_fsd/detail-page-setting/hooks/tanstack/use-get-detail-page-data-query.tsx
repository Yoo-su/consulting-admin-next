import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getDetailPageData } from '../../apis';

export const useGetDetailPageDataQuery = (serviceID: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEYS['detail-page-setting']['data'](serviceID!).queryKey,
    queryFn: () => getDetailPageData(serviceID!),
    enabled: !!serviceID,
  });
};
