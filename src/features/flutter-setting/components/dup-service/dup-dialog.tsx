import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import SelectService from './select-service';
import { ServiceOption } from '../../constants';
import toast from 'react-hot-toast';
import { setDuplicateSetting } from '../../apis';
import { useUnivService } from '@/shared/hooks/context';
import { useQueryClient } from '@tanstack/react-query';
import { useSetDuplicateSettingMutation } from '../../hooks/use-set-duplicate-setting';

type DupDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DupDialog = ({ open, setOpen }: DupDialogProps) => {
  const { mutateAsync } = useSetDuplicateSettingMutation();
  const { currentService } = useUnivService();
  const queryClient = useQueryClient();
  const [selectedService, setselectedService] = useState<ServiceOption | null>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async () => {
    if (!selectedService) {
      toast.error('복제할 서비스 아이디를 선택해주세요.', { id: 'dup-service-toast' });
      return;
    }
    if (!currentService) {
      toast.error('대학 및 서비스가 선택되지 않았습니다. 사이드바에서 값을 선택해주세요');
    } else {
      const params = {
        sourceServiceID: Number(selectedService.serviceID),
        targetServiceID: Number(currentService.serviceID),
      };
      await mutateAsync(params, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['flutter-custom-config', { serviceID: currentService.serviceID }],
          });
        },
        onError: () => {
          return;
        },
      });
    }
    handleClose();
  };
  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose} closeAfterTransition={false}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>이전 서비스 설정 복제</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Typography variant="subtitle2">복제할 서비스를 선택해주세요.</Typography>
          <SelectService selectedService={selectedService} setselectedService={setselectedService} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          sx={{
            color: '#2C4059',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          onClick={handleClose}
        >
          취소
        </Button>
        <Button
          size="small"
          sx={{
            backgroundColor: '#2C4059',
            color: '#fafafa',
            '&:hover': {
              backgroundColor: '#2C4059',
              color: '#fafafa',
            },
          }}
          onClick={handleConfirm}
          autoFocus
        >
          복제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DupDialog;
