'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadFoundationLibrary } from '../apis';

export const useUploadFoundationLibraryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return uploadFoundationLibrary(formData);
    },
    onSuccess(data, variables, context) {
      const serviceID = variables.get('serviceID');
      queryClient.invalidateQueries({
        queryKey: ['get-foundation-libraries', Number(serviceID)],
      });
    },
  });
};
