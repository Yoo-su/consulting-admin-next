'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateConsultingAppStateParams, updateConsultingAppState } from '../apis';

export const useUpdateConsultingAppStateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateConsultingAppStateParams) => updateConsultingAppState(params),
    onSuccess(data, variables, context) {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['consultingAppState'] }),
        queryClient.invalidateQueries({ queryKey: ['consultingAppStateAll'] }),
      ]);
    },
  });
};
