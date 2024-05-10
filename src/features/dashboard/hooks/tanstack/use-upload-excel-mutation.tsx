'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadFoundationLibrary } from '../../apis/upload-foundation-library';
import { useUser } from '@/features/auth/hooks/use-user';
import { useUnivService } from '@/shared/hooks/use-univ-service';

export const useUploadExcelMutation = () => {
  const { user } = useUser();
  const { currentService } = useUnivService();
  return useMutation({
    mutationFn: (formData: FormData) => {
      formData.append('userID', user?.userID ?? '');
      formData.append('serviceID', currentService?.serviceID ?? '');
      return uploadFoundationLibrary(formData);
    },
  });
};
