import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

import { QUERY_KEYS } from '@/shared/constants';
import { useUnivService } from '@/shared/hooks/context';

import { ServiceOption } from '../../constants';
import { useSetDuplicateSettingMutation } from '../../hooks/use-set-duplicate-setting';
import SelectService from './select-service';

type DupDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DupDialog = ({ open, setOpen }: DupDialogProps) => {
  const { mutateAsync } = useSetDuplicateSettingMutation();
  const { currentService } = useUnivService();
  const queryClient = useQueryClient();

  const [selectedService, setselectedService] = useState<ServiceOption | null>(
    null
  );
  const [isShowAlert, setIsShowAlert] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setIsShowAlert(false);
  };
  const handleConfirm = async () => {
    if (!selectedService) {
      toast.error('복제할 서비스 아이디를 선택해주세요.', {
        id: 'dup-service-toast',
      });
      return;
    }
    if (!currentService) {
      toast.error(
        '대학 및 서비스가 선택되지 않았습니다. 사이드바에서 값을 선택해주세요'
      );
      return;
    }
    if (!isShowAlert) {
      setIsShowAlert(true);
      return;
    }

    const params = {
      sourceServiceID: Number(selectedService.serviceID),
      targetServiceID: Number(currentService.serviceID),
    };
    await mutateAsync(params, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS['flutter-setting']['custom-config'](
            currentService.serviceID!
          ).queryKey,
        });
      },
      onError: () => {
        setIsShowAlert(false);
        return;
      },
    });
    setIsShowAlert(false);

    handleClose();
  };
  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      closeAfterTransition={false}
      PaperProps={{ style: { width: '250px' } }}
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        이전 서비스 설정 복제
      </DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Typography variant="subtitle2">
            복제할 서비스를 선택해주세요.
          </Typography>
          <SelectService
            selectedService={selectedService}
            setselectedService={setselectedService}
          />
          <Typography variant="caption" sx={{ color: '#ff0000' }}>
            {isShowAlert && '정말로 복제하시겠습니까?'}
          </Typography>
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
          {isShowAlert ? '확인' : '복제'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DupDialog;
