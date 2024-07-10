'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deployApp } from '../../apis/deploy-app';

export const useDeployAppMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => deployApp(formData),
    onSuccess: (data, variables, context) => {
      const serviceID = variables.get('serviceID');
      const osType = variables.get('osType');

      queryClient.invalidateQueries({
        queryKey: ['get-app-version-history', serviceID, osType],
      });
    },
  });
};
