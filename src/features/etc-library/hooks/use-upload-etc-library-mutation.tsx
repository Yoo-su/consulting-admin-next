'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadEtcLibrary } from '../apis';
export const useUploadEtcLibraryMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return uploadEtcLibrary(formData);
    },
  });
};
