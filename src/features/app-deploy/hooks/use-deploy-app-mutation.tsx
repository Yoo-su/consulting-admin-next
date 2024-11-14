'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deployApp } from '../apis';
import { FEATURE_KEYS } from '@/shared/constants/query-keys';

export const useDeployAppMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => deployApp(formData),
    onSuccess: (data, variables, context) => {
      const serviceID = variables.get('serviceID') as string;
      const osType = variables.get('osType') as string;

      queryClient.invalidateQueries({
        queryKey: FEATURE_KEYS['app-version-history'].history(serviceID, osType).queryKey,
      });
    },
  });
};
