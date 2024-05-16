'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadFoundationLibrary } from '../../apis/upload-foundation-library';

export const useUploadExcelMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return uploadFoundationLibrary(formData);
    },
  });
};
