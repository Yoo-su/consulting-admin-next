'use client';

import { useMutation } from '@tanstack/react-query';

import {
  deleteConsultingFile,
  DeleteConsultingFileParams,
  updateConsultingRefNo,
  UpdateConsultingRefNoParams,
  updateConsultingRefTitle,
  UpdateConsultingRefTitleParams,
} from '../apis';

export const useUpdateConsultingRefNoMutation = () => {
  return useMutation({
    mutationFn: (updateConsultingRefNoParams: UpdateConsultingRefNoParams) => {
      return updateConsultingRefNo(updateConsultingRefNoParams);
    },
  });
};

export const useUpdateConsultingRefTitleMutation = () => {
  return useMutation({
    mutationFn: (updateConsultingRefTitleParams: UpdateConsultingRefTitleParams) => {
      return updateConsultingRefTitle(updateConsultingRefTitleParams);
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
