'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getAppVersionHistory } from '../apis';
import { OsTypeValues } from '../models';
import { OsType } from '../constants';

export const useGetAppVersionHistoryQuery = (
  serviceID: string | undefined,
  osType: Exclude<OsTypeValues, 'O'> | null
) => {
  return useQuery({
    queryKey: QUERY_KEYS['app-version-history'].history(serviceID!, osType!)
      .queryKey,
    queryFn: () => getAppVersionHistory(serviceID!, osType!),
    enabled: !!serviceID && (osType === OsType.PC || osType === OsType.APK),
  });
};
