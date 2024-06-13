'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadEtcLibrary } from '../../apis/upload-etc-library';
export const useUploadEtcLibraryMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return uploadEtcLibrary(formData);
    },
  });
};
