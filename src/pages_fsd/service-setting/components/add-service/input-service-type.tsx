import { InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { serviceTypeList, ServiceTypeNum } from '../../constants';

type InputServiceTypeProps = {
  serviceType: ServiceTypeNum;
  setServiceType: Dispatch<SetStateAction<ServiceTypeNum>>;
};

export const InputServiceType = ({
  serviceType,
  setServiceType,
}: InputServiceTypeProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setServiceType(event.target.value as ServiceTypeNum);
  };
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={2}>
      <InputLabel>서비스 유형</InputLabel>
      <TextField
        select
        value={serviceType}
        sx={{ minWidth: '150px' }}
        size="small"
        onChange={handleChange}
      >
        {serviceTypeList.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};
