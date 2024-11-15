import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { setFlutterCustomConfig, SetFlutterCustomConfigParams } from '../apis';

export const useSetFlutterSettingMutation = () => {
  return useMutation({
    mutationKey: ['set-flutter-setting'],
    mutationFn: (params: SetFlutterCustomConfigParams) =>
      setFlutterCustomConfig(params),
    onError: (error) => {
      toast.error(
        <Typography variant="body2">변경사항 적용에 실패했습니다</Typography>
      );
      console.error('onError', error);
    },
  });
};
