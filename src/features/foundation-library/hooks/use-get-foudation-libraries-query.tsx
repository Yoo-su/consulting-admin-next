'use client';

import { useQuery } from '@tanstack/react-query';
import { getFoundationLibraries } from '../apis';

export const useGetFoundationLibrariesQuery = (serviceID: string | undefined) => {
  return useQuery({
    queryKey: ['get-foundation-libraries', serviceID],
    queryFn: () => getFoundationLibraries(serviceID!),
    enabled: !!serviceID,
  });
};
