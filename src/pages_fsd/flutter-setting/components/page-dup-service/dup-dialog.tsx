import { Dialog, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import { ServiceOption } from '../../constants';
import { DupDialogActions } from './dup-dialog-actions';
import { DupDialogContent } from './dup-dialog-content';

type DupDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const DupDialog = ({ open, setOpen }: DupDialogProps) => {
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(
    null
  );
  const [isShowAlert, setIsShowAlert] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setIsShowAlert(false);
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
      <DupDialogContent
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        isShowAlert={isShowAlert}
      />
      <DupDialogActions
        isShowAlert={isShowAlert}
        handleClose={handleClose}
        selectedService={selectedService}
        setIsShowAlert={setIsShowAlert}
      />
    </Dialog>
  );
};
