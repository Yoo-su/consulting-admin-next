'use client';

import { Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { uploadEtcLibrary } from '../apis';

export const useUploadEtcLibraryMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => await uploadEtcLibrary(formData),
    onError: (error) => {
      throw error;
    },
  });
};
