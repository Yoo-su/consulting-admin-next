import { Button, DialogActions } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { QUERY_KEYS } from '@/shared/constants';
import { useTypographyToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { DUP_ERROR_MESSAGE } from '../../constants';
import { DupDialogCancelBtn, DupDialogConfirmBtn } from '../../constants/classes';
import { useSetDuplicateSettingMutation } from '../../hooks';
import { ServiceOption } from '../../models';

type DupDialogActionsProps = {
  isShowAlert: boolean;
  handleClose: () => void;
  selectedService: ServiceOption | null;
  setIsShowAlert: Dispatch<SetStateAction<boolean>>;
};

export const DupDialogActions = ({
  isShowAlert,
  handleClose,
  selectedService,
  setIsShowAlert,
}: DupDialogActionsProps) => {
  const { showError } = useTypographyToast();
  const { mutateAsync } = useSetDuplicateSettingMutation();
  const { currentService } = useSharedStore();
  const queryClient = useQueryClient();

  const isValid = () => {
    if (!selectedService || !currentService) {
      showError(!selectedService ? DUP_ERROR_MESSAGE.NO_SERVICE_ID : DUP_ERROR_MESSAGE.NO_UNIV_OR_SERVICE, undefined, {
        id: !selectedService ? 'dup-serviceId-toast' : 'dup-service-toast',
      });
      return false;
    }
    if (!isShowAlert) {
      setIsShowAlert(true);
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!isValid()) return;

    const params = {
      sourceServiceID: Number(selectedService!.serviceID),
      targetServiceID: Number(currentService!.serviceID),
    };
    await mutateAsync(params, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS['flutter-setting']['custom-config'](currentService!.serviceID).queryKey,
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
    <DialogActions>
      <Button size="small" sx={DupDialogCancelBtn} onClick={handleClose}>
        취소
      </Button>
      <Button size="small" sx={DupDialogConfirmBtn} onClick={handleConfirm} autoFocus>
        {isShowAlert ? '확인' : '복제'}
      </Button>
    </DialogActions>
  );
};
