import { Chip } from '@mui/material';
import { HTMLAttributes, Key } from 'react';

import {
  DupDialogOptionLabelChipClass,
  DupDialogOptionLabelClass,
} from '../constants/classes';
import { ServiceOption } from '../models';

export const getRenderOption = (
  props: HTMLAttributes<HTMLLIElement> & { key?: Key },
  option: ServiceOption
) => {
  const { serviceID, isSusi } = option;
  const { key, ...rest } = props;
  const isSusiNum = Number(isSusi);
  const label = isSusiNum ? '수시' : '정시';
  return (
    <li key={key} {...rest} style={DupDialogOptionLabelClass(serviceID)}>
      <Chip
        label={label}
        size="small"
        sx={DupDialogOptionLabelChipClass(isSusiNum)}
      />
      {serviceID}
    </li>
  );
};

export const getOptionLabel = (option: ServiceOption) =>
  `${option.isSusi === '1' ? '수시' : '정시'} ` + option.serviceID;

export const getOptionDisabled = (
  option: ServiceOption,
  serviceID: string | undefined
) => option.serviceID === serviceID;

export const isOptionEqualToValue = (
  option: ServiceOption,
  value: ServiceOption
) => option.serviceID === value.serviceID;
