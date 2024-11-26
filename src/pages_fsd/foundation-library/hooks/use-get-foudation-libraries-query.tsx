'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getFoundationLibraries } from '../apis';

export const useGetFoundationLibrariesQuery = (
  serviceID: string | undefined
) => {
  return useQuery({
    queryKey: QUERY_KEYS['foundation-library']['library-data'](serviceID!)
      .queryKey,
    queryFn: () => getFoundationLibraries(serviceID!),
    enabled: !!serviceID,
  });
};
