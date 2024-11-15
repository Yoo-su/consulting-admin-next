'use client';

import { useMutation } from '@tanstack/react-query';

import { useUser } from '@/shared/hooks/context';

import { uploadConsultingFile } from '../apis';
import { UploadFile } from '../models';

export const useUploadConsultingFileMutation = () => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (uploadFile: UploadFile) => {
      return uploadConsultingFile(uploadFile, user!.sub);
    },
  });
};
