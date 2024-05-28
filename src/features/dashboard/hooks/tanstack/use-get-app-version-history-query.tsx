'use client';

import { useQuery, skipToken } from '@tanstack/react-query';
import { getAppVersionHistory } from '../../apis/get-app-version-history';

export const useGetAppVersionHistoryQuery = (serviceID: string | undefined, osType: 'O' | 'P' | 'A' | null) => {
  return useQuery({
    queryKey: ['get-app-version-history', serviceID],
    queryFn:
      serviceID && (osType === 'P' || osType === 'A') ? () => getAppVersionHistory(serviceID, osType) : skipToken,
    enabled: !!(serviceID && (osType === 'P' || osType === 'A')),
    refetchOnMount: true,
    staleTime: 0,
  });
};
