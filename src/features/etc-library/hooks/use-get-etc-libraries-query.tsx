'use client';

import { useQuery, skipToken } from '@tanstack/react-query';
import { getEtcLibrary } from '../apis';

export const useGetEtcLibrariesQuery = (serviceID: string | undefined) => {
  return useQuery({
    queryKey: ['get-etc-library', serviceID],
    queryFn: serviceID ? () => getEtcLibrary(serviceID) : skipToken,
    enabled: !!serviceID,
    refetchOnMount: true,
    staleTime: 0,
  });
};
