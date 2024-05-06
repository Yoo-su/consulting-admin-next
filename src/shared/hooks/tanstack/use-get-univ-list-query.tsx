'use client';

import { useQuery } from '@tanstack/react-query';
import { getUnivList } from '@/features/dashboard/apis/get-univ-list';

export const useGetUnivListQuery = () => {
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ['univ-list'],
    queryFn: getUnivList,
    staleTime: Infinity,
    enabled: false,
  });

  return { data, isError, isPending, refetch };
};
