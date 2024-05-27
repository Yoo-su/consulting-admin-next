'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadFoundationLibraryFileOnly } from '../../apis/upload-foundation-library-file-only';
export const useUploadFoundationLibraryFileOnlyMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return uploadFoundationLibraryFileOnly(formData);
    },
  });
};
