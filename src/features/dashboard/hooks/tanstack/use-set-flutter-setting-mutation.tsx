import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SetFlutterCustomConfigParams, setFlutterCustomConfig } from '../../apis/set-flutter-custom-config';

export const useSetFlutterSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['set-flutter-setting'],
    mutationFn: (params: SetFlutterCustomConfigParams) => setFlutterCustomConfig(params),
    onSuccess: () => {
      console.log('onSuccess');
      queryClient.invalidateQueries({ queryKey: ['flutter-setting'] });
    },
  });
};
