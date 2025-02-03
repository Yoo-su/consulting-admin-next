import { DialogContent, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { ServiceOption } from '../../models';
import { SelectService } from './select-service';

type DupDialogContentProps = {
  selectedService: ServiceOption | null;
  setSelectedService: Dispatch<SetStateAction<ServiceOption | null>>;
  isShowAlert: boolean;
};

export const DupDialogContent = ({ selectedService, setSelectedService, isShowAlert }: DupDialogContentProps) => {
  return (
    <DialogContent>
      <Stack gap={2}>
        <Typography variant="subtitle2">복제할 서비스를 선택해주세요.</Typography>
        <SelectService selectedService={selectedService} setSelectedService={setSelectedService} />
        <Typography variant="caption" sx={{ color: '#ff0000' }}>
          {isShowAlert && '정말로 복제하시겠습니까?'}
        </Typography>
      </Stack>
    </DialogContent>
  );
};
