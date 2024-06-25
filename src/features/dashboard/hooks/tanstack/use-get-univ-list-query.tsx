'use client';

import { useQuery } from '@tanstack/react-query';
import { getUnivList } from '@/features/dashboard/apis/get-univ-list';
import { Univ } from '../../types/univ.type';

export const useGetUnivListQuery = () => {
  const sessionUnivList = sessionStorage.getItem('univ-list');
  const initialData: Univ[] = sessionUnivList ? JSON.parse(sessionUnivList) : [];

  return useQuery({
    queryKey: ['univ-list'],
    queryFn: getUnivList,
    initialData: initialData,
    staleTime: 0,
    enabled: !initialData.length,
  });
};
