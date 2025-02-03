'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getAppVersionHistory } from '../apis';
import { OS_TYPE } from '../constants';
import { OsTypeValues } from '../models';

export const useGetAppVersionHistoryQuery = (
  serviceID: string | undefined,
  osType: Exclude<OsTypeValues, 'O'> | null
) => {
  return useQuery({
    queryKey: QUERY_KEYS['app-version-history'].history(serviceID!, osType!).queryKey,
    queryFn: () => getAppVersionHistory(serviceID!, osType!),
    enabled: !!serviceID && (osType === OS_TYPE.PC || osType === OS_TYPE.APK),
  });
};
