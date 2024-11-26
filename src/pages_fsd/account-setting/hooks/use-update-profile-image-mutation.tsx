'use client';

import { useMutation } from '@tanstack/react-query';

import { updateProfileImage } from '../apis';

export const useUpdateProfileImageMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => updateProfileImage(formData),
  });
};
