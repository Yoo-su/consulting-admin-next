'use client';

import { useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AdbIcon from '@mui/icons-material/Adb';

import ContentWrapper from '@/shared/components/content-wrapper';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useGetAppVersionHistoryQuery } from '../../hooks/tanstack/use-get-app-version-history-query';
import AppPWAContainer from './app-pwa-container';
import AppProgContainer from './app-prog-container';
import RadioIconLabel from './radio-icon-label';

const AppHistoryListBox = () => {
  const { currentService } = useUnivService();
  const isNew = currentService?.isNew ?? false;

  const [appType, setAppType] = useState<'O' | 'A' | 'P'>(isNew ? 'A' : 'O');

  const { data: histories } = useGetAppVersionHistoryQuery(currentService?.serviceID, appType === 'O' ? null : appType);

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <FormControl sx={{ alignItems: 'center' }}>
          <RadioGroup
            row
            name="app-type-radio-group"
            onChange={(e) => {
              setAppType(e.target.value as typeof appType);
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
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        {appType == 'O' ? <AppPWAContainer /> : <AppProgContainer histories={histories} />}
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default AppHistoryListBox;
