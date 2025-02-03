import { Button, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export const useConfirmToast = () => {
  const openConfirmToast = useCallback(
    ({
      id = undefined,
      message,
      callbackConfirm,
      callbackCancel = () => {},
    }: {
      id?: string | undefined;
      message: string;
      callbackConfirm: any;
      callbackCancel?: any;
    }) => {
      toast(
        (t) => (
          <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={1}>
            <Typography variant="body2" textAlign={'center'}>
              {message}
            </Typography>
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={0.2}>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ width: 'fit-content' }}
                onClick={() => {
                  callbackConfirm();
                  toast.dismiss(t.id);
                }}
              >
                예
              </Button>
              <Button
                variant="text"
                color="inherit"
                size="small"
                sx={{ width: 'fit-content' }}
                onClick={() => {
                  callbackCancel();
                  toast.dismiss(t.id);
                }}
              >
                아니오
              </Button>
            </Stack>
          </Stack>
        ),
        { id }
      );
    },
    []
  );

  return { openConfirmToast };
};
