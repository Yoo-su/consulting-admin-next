import { Dispatch, SetStateAction, useEffect } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AdbIcon from '@mui/icons-material/Adb';

import RadioIconLabel from './radio-icon-label';
import { ConsultingAppType } from '../models';

type HeaderSelectRadioProps = {
  appType: ConsultingAppType;
  setAppType: Dispatch<SetStateAction<ConsultingAppType>>;
  isNew: boolean;
};

const HeaderSelectRadio = ({ appType, setAppType, isNew }: HeaderSelectRadioProps) => {
  useEffect(() => {
    if (isNew) {
      setAppType('A');
    } else {
      setAppType('O');
    }
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
        <RadioIconLabel
          label="PWA 주소"
          value="O"
          disabled={isNew}
          Icon={<AlternateEmailRoundedIcon fontSize="large" sx={{ color: '#2C4059', mr: '0.2rem' }} />}
        />
        <RadioIconLabel
          label="안드로이드 APK"
          value="A"
          disabled={!isNew}
          Icon={<AdbIcon fontSize="large" sx={{ color: '#7CB342', mr: '0.1rem' }} />}
        />
        <RadioIconLabel
          label="데스크탑 APP"
          value="P"
          disabled={!isNew}
          Icon={<DesktopWindowsIcon fontSize="large" sx={{ color: '#1D2951', mr: '0.1rem' }} />}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default HeaderSelectRadio;
