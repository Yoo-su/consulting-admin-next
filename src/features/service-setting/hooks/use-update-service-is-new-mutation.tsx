'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateIsNewParams, updateServiceIsNew } from '../apis';

export const useUpdateServiceIsNewtMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateIsNewParams: UpdateIsNewParams) => updateServiceIsNew(updateIsNewParams),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['service-list', data.data.univID] });
    },
  });
};
