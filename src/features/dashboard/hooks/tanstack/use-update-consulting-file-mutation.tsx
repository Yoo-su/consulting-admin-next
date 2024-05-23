'use client';

import { useMutation } from '@tanstack/react-query';
import { UpdateConsultingRefNoParams, updateConsultingRefNo } from '../../apis/update-consulting-file-refno';
import { DeleteConsultingFileParams, deleteConsultingFile } from '../../apis/delete-consulting-file';

export const useUpdateConsultingRefNoMutation = () => {
  return useMutation({
    mutationFn: (updateConsultingRefNoParams: UpdateConsultingRefNoParams) => {
      return updateConsultingRefNo(updateConsultingRefNoParams);
    },
  });
};

export const useDeleteConsultingFileMutation = () => {
  return useMutation({
    mutationFn: (deleteConsultingFileParams: DeleteConsultingFileParams) => {
      return deleteConsultingFile(deleteConsultingFileParams);
    },
  });
};
