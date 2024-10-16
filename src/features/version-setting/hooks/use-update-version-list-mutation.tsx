'use client';

import { useMutation } from '@tanstack/react-query';
import { UpdateVersionListParams, updateVersionList } from '../apis';

export const useUpdateVersionListMutation = () => {
  return useMutation({
    mutationFn: (updateVersionListParams: UpdateVersionListParams) => updateVersionList(updateVersionListParams),
  });
};
