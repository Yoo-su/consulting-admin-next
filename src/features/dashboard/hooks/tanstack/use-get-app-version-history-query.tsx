'use client';

import { useQuery, skipToken } from '@tanstack/react-query';
import { getAppVersionHistory } from '../../apis/get-app-version-history';

export const useGetAppVersionHistoryQuery = (serviceID: string | undefined, osType: 'P' | 'A' | null) => {
  return useQuery({
    queryKey: ['get-app-version-history', serviceID],
    queryFn: serviceID && osType ? () => getAppVersionHistory(serviceID, osType) : skipToken,
    enabled: !!(serviceID && osType),
    refetchOnMount: true,
    staleTime: 0,
  });
};
