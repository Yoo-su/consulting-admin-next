'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getAppVersionHistory } from '../apis';

export const useGetAppVersionHistoryQuery = (
  serviceID: string | undefined,
  osType: 'P' | 'A' | null
) => {
  return useQuery({
    queryKey: QUERY_KEYS['app-version-history'].history(serviceID!, osType!)
      .queryKey,
    queryFn: () => getAppVersionHistory(serviceID!, osType!),
    enabled: !!serviceID && (osType === 'P' || osType === 'A'),
  });
};
