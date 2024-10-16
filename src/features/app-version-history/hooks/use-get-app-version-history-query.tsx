'use client';

import { useQuery } from '@tanstack/react-query';
import { getAppVersionHistory } from '../apis';

export const useGetAppVersionHistoryQuery = (serviceID: string | undefined, osType: 'P' | 'A' | null) => {
  return useQuery({
    queryKey: ['get-app-version-history', serviceID, osType],
    queryFn: () => getAppVersionHistory(serviceID!, osType!),
    enabled: !!serviceID && (osType === 'P' || osType === 'A'),
  });
};
