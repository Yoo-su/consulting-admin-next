'use client';

import { skipToken, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getEtcLibrary } from '../apis';

export const useGetEtcLibrariesQuery = (serviceID: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEYS['etc-library']['library-data'](serviceID!).queryKey,
    queryFn: serviceID ? () => getEtcLibrary(serviceID) : skipToken,
    enabled: !!serviceID,
    refetchOnMount: true,
    staleTime: 0,
  });
};
