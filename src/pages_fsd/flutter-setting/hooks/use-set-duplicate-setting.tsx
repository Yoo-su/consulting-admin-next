import { useMutation } from '@tanstack/react-query';

import { useTypographyToast } from '@/shared/hooks';

import { setDuplicateSetting, SetDuplicateSettingParams } from '../apis';
import { DUP_MUTATION_MESSAGE } from '../constants';

type ApiError = Error & {
  response?: {
    data: any;
    status: number;
    headers: any;
  };
};
export const useSetDuplicateSettingMutation = () => {
  const { showError, showSuccess } = useTypographyToast();
  return useMutation({
    mutationKey: ['set-duplicate-setting'],
    mutationFn: (params: SetDuplicateSettingParams) => setDuplicateSetting(params),
    onError: (error: ApiError) => {
      const { response } = error;
      showError(response?.data.message);
    },
    onSuccess: (data) => {
      showSuccess(data?.message ?? DUP_MUTATION_MESSAGE.MUTATION_SUCCESS);
    },
  });
};
