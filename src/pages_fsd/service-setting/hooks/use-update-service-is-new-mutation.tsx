'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { UpdateIsNewParams, updateServiceIsNew } from '../apis';

export const useUpdateServiceIsNewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateIsNewParams: UpdateIsNewParams) => updateServiceIsNew(updateIsNewParams),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.service['list'](data.data.univID as string).queryKey,
      });
    },
  });
};
