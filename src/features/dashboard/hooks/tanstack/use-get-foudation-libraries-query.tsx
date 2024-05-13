'use client';

import { useQuery, skipToken } from '@tanstack/react-query';
import { getFoundationLibraries } from '../../apis/get-foundation-libraries';

export const useGetFoundationLibrariesQuery = (serviceID: number | undefined) => {
  return useQuery({
    queryKey: ['get-foundation-libraries', serviceID],
    queryFn: serviceID ? () => getFoundationLibraries(serviceID) : skipToken,
    enabled: !!serviceID,
  });
};
