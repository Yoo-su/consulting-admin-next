'use client';

import { useMutation } from '@tanstack/react-query';

import { updateVersionList, UpdateVersionListParams } from '../apis';

export const useUpdateVersionListMutation = () => {
  return useMutation({
    mutationFn: (updateVersionListParams: UpdateVersionListParams) =>
      updateVersionList(updateVersionListParams),
  });
};
