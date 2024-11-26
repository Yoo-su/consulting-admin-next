import { Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { setDuplicateSetting, SetDuplicateSettingParams } from '../apis';

type ApiError = Error & {
  response?: {
    data: any;
    status: number;
    headers: any;
  };
};
export const useSetDuplicateSettingMutation = () => {
  return useMutation({
    mutationKey: ['set-duplicate-setting'],
    mutationFn: (params: SetDuplicateSettingParams) =>
      setDuplicateSetting(params),
    onError: (error: ApiError) => {
      const { response } = error;
      toast.error(
        <Typography variant="body2">{response?.data.message}</Typography>
      );
    },
    onSuccess: (data) => {
      toast.success(
        <Typography variant="body2">
          {data?.message ?? '변경 사항이 저장되었습니다.'}
        </Typography>
      );
    },
  });
};
