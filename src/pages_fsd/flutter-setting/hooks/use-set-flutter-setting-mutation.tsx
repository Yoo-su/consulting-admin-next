import { useMutation } from '@tanstack/react-query';

import { useTypographyToast } from '@/shared/hooks';

import { setFlutterCustomConfig, SetFlutterCustomConfigParams } from '../apis';
import { FLUTTER_SETTING_MESSAGE } from '../constants';

export const useSetFlutterSettingMutation = () => {
  const { showError } = useTypographyToast();
  return useMutation({
    mutationKey: ['set-flutter-setting'],
    mutationFn: (params: SetFlutterCustomConfigParams) => setFlutterCustomConfig(params),
    onError: (error) => {
      showError(FLUTTER_SETTING_MESSAGE.UPDATE_ERROR);
      console.error('onError', error);
    },
  });
};
