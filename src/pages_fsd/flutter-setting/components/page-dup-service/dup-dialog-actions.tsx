import { QUERY_KEYS } from '@/shared/constants';
import { useSharedStore } from '@/shared/models';
import { Button, DialogActions } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import {
  DupDialogCancelBtn,
  DupDialogConfirmBtn,
} from '../../constants/classes';
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
  const { mutateAsync } = useSetDuplicateSettingMutation();
  const { currentService } = useSharedStore();
  const queryClient = useQueryClient();

  const isValid = () => {
    if (!selectedService || !currentService) {
      toast.error(
        !selectedService
          ? '복제할 서비스 아이디를 선택해주세요.'
          : '대학 및 서비스가 선택되지 않았습니다. 사이드바에서 값을 선택해주세요',
        { id: !selectedService ? 'dup-serviceId-toast' : 'dup-service-toast' }
      );
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
          queryKey: QUERY_KEYS['flutter-setting']['custom-config'](
            currentService!.serviceID
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
    <DialogActions>
      <Button size="small" sx={DupDialogCancelBtn} onClick={handleClose}>
        취소
      </Button>
      <Button
        size="small"
        sx={DupDialogConfirmBtn}
        onClick={handleConfirm}
        autoFocus
      >
        {isShowAlert ? '확인' : '복제'}
      </Button>
    </DialogActions>
  );
};
