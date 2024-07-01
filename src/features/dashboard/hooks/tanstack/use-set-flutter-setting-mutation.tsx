import { useMutation } from '@tanstack/react-query';
import { SetFlutterCustomConfigParams, setFlutterCustomConfig } from '../../apis/set-flutter-custom-config';
import toast from 'react-hot-toast';

export const useSetFlutterSettingMutation = () => {
  return useMutation({
    mutationKey: ['set-flutter-setting'],
    mutationFn: (params: SetFlutterCustomConfigParams) => setFlutterCustomConfig(params),
    onError: (error) => {
      toast.error('변경사항 적용에 실패했습니다.');
      console.log('onError', error);
    },
  });
};
