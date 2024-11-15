'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import {
  updateConsultingAppState,
  UpdateConsultingAppStateParams,
} from '../apis';

export const useUpdateConsultingAppStateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateConsultingAppStateParams) =>
      updateConsultingAppState(params),
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
