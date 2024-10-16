'use client';

import { useMutation } from '@tanstack/react-query';

import { uploadFoundationLibraryFileOnly } from '../apis';

export const useUploadFoundationLibraryFileOnlyMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return uploadFoundationLibraryFileOnly(formData);
    },
  });
};
