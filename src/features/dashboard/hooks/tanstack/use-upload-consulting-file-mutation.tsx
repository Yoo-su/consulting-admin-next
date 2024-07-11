'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadConsultingFile } from '../../apis/upload-consulting-file';
import { UploadFile } from '../../types/consulting-file';
import { useUser } from '@/features/auth/hooks/use-user';

export const useUploadConsultingFileMutation = () => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (uploadFile: UploadFile) => {
      return uploadConsultingFile(uploadFile, user!.sub);
    },
  });
};
