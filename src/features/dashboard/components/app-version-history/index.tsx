'use client';

import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';

import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AdbIcon from '@mui/icons-material/Adb';

import { useUnivService } from '@/features/dashboard/hooks/use-univ-service';
import { useGetAppVersionHistoryQuery } from '../../hooks/tanstack/use-get-app-version-history-query';
import AppPWAContainer from './app-pwa-container';
import AppProgContainer from './app-prog-container';

const AppHistoryListBox = () => {
  const [appType, setAppType] = useState<'O' | 'A' | 'P'>('O');
  const { currentService } = useUnivService();
  const {
    data: histories,
    refetch,
    isPending,
  } = useGetAppVersionHistoryQuery(currentService?.serviceID, appType === 'O' ? null : appType);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appType]);

  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        p: 2,
      }}
    >
      <FormControl sx={{ alignItems: 'center' }}>
        <RadioGroup
          row
          name="app-type-radio-group"
          onChange={(e) => {
            setAppType(e.target.value as typeof appType);
          }}
          value={appType}
        >
          <FormControlLabel
            value="O"
            control={<Radio size="medium" />}
            label={
              <Stack direction={'row'} alignItems={'center'}>
                <AlternateEmailRoundedIcon fontSize="large" sx={{ color: '#2C4059', mr: '0.2rem' }} />
                <Typography variant="body2">PWA 주소</Typography>
              </Stack>
            }
          />
          <FormControlLabel
            value="A"
            control={<Radio size="medium" />}
            label={
              <Stack direction={'row'} alignItems={'center'}>
                <AdbIcon fontSize="large" sx={{ color: '#7CB342', mr: '0.1rem' }} />
                <Typography variant="body2">안드로이드 APK</Typography>
              </Stack>
            }
          />
          <FormControlLabel
            value="P"
            control={<Radio size="medium" />}
            label={
              <Stack direction={'row'} alignItems={'center'}>
                <DesktopWindowsIcon fontSize="large" sx={{ color: '#1D2951', mr: '0.1rem' }} />
                <Typography variant="body2">데스크탑 APP</Typography>
              </Stack>
            }
          />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.05)' }} />

      {appType == 'O' ? <AppPWAContainer /> : <AppProgContainer histories={histories} />}
    </Stack>
  );
};

export default AppHistoryListBox;
