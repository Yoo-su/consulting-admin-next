import { useMutation } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import { SetFlutterCustomConfigParams, setFlutterCustomConfig } from '../../apis/set-flutter-custom-config';

export const useSetFlutterSettingMutation = () => {
  return useMutation({
    mutationKey: ['set-flutter-setting'],
    mutationFn: (params: SetFlutterCustomConfigParams) => setFlutterCustomConfig(params),
    onError: (error) => {
      toast.error(<Typography variant="body2">변경사항 적용에 실패했습니다</Typography>);
      console.error('onError', error);
    },
  });
};
