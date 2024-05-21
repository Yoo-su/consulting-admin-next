'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadConsultingFile } from '../../apis/upload-consulting-file';
import { UploadFile } from '../../types/consulting-file';

export const useUploadConsultingFileMutation = () => {
  return useMutation({
    mutationFn: (uploadFile: UploadFile) => {
      return uploadConsultingFile(uploadFile);
    },
  });
};
