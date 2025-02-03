'use client';

import { useQuery } from '@tanstack/react-query';

import { getUnivList } from '@/shared/apis';
import { QUERY_KEYS } from '@/shared/constants';

export const useGetUnivListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.univ['list'].queryKey,
    queryFn: getUnivList,
    staleTime: Infinity,
  });
};
