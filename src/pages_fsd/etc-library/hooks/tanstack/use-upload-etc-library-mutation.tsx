'use client';

import { useMutation } from '@tanstack/react-query';

import { uploadEtcLibrary } from '../../apis';

export const useUploadEtcLibraryMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => await uploadEtcLibrary(formData),
    onError: (error) => {
      console.error(error);
      return error;
    },
  });
};
