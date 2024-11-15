'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { uploadFoundationLibrary } from '../apis';

export const useUploadFoundationLibraryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return uploadFoundationLibrary(formData);
    },
    onSuccess(data, variables, context) {
      const serviceID = variables.get('serviceID') as string;
      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS['foundation-library']['library-data'](serviceID).queryKey,
      });
    },
  });
};
