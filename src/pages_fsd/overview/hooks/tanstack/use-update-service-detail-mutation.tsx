'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { updateServiceDetail, UpdateServiceDetailParams } from '../../apis';

export const useUpdateServiceDetailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateServiceDetailParams) => updateServiceDetail(params),
    onSuccess() {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.overview['work-status'].queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.overview['work-status-all'].queryKey,
        }),
      ]);
    },
  });
};
