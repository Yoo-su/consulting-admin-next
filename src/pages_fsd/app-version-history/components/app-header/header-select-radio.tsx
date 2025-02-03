'use client';

import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { OS_OPTIONS, OS_TYPE } from '../../constants';
import { ConsultingAppType } from '../../models';
import { RadioIconLabel } from './radio-icon-label';

type HeaderSelectRadioProps = {
  appType: ConsultingAppType;
  setAppType: Dispatch<SetStateAction<ConsultingAppType>>;
  isNew: boolean;
};

export const HeaderSelectRadio = ({ appType, setAppType, isNew }: HeaderSelectRadioProps) => {
  useEffect(() => {
    setAppType(isNew ? OS_TYPE.APK : OS_TYPE.PWA);
  }, [isNew]);

  return (
    <FormControl sx={{ alignItems: 'center' }}>
      <RadioGroup
        row
        name="app-type-radio-group"
        onChange={(e) => {
          setAppType(e.target.value as ConsultingAppType);
        }}
        value={appType}
      >
        {OS_OPTIONS.map(({ label, value, icon: Icon, iconColor, marginRight, getDisabled }) => (
          <RadioIconLabel
            key={value}
            label={label}
            value={value}
            disabled={getDisabled(isNew)}
            Icon={<Icon fontSize="large" sx={{ color: iconColor, mr: marginRight }} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
