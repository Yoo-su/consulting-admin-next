'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadConsultingFile } from '../apis';
import { UploadFile } from '../models';
import { useUser } from '@/shared/hooks/context';

export const useUploadConsultingFileMutation = () => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (uploadFile: UploadFile) => {
      return uploadConsultingFile(uploadFile, user!.sub);
    },
  });
};
