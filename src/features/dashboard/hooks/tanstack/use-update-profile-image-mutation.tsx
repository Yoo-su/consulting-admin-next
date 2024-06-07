'use client';

import { useMutation } from '@tanstack/react-query';
import { updateProfileImage } from '../../apis/update-profile-image';

export const useUpdateProfileImageMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => updateProfileImage(formData),
  });
};
