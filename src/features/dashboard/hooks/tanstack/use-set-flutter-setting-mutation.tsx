import { useMutation } from '@tanstack/react-query';
import { SetFlutterCustomConfigParams, setFlutterCustomConfig } from '../../apis/set-flutter-custom-config';

export const useSetFlutterSettingMutation = () => {
  return useMutation({
    mutationKey: ['set-flutter-setting'],
    mutationFn: (params: SetFlutterCustomConfigParams) => setFlutterCustomConfig(params),
  });
};
