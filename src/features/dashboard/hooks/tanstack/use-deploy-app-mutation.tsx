'use client';

import { useMutation } from '@tanstack/react-query';
import { deployApp } from '../../apis/deploy-app';

export const useDeployAppMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => deployApp(formData),
  });
};
