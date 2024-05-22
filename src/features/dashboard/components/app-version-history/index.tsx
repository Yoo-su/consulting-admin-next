'use client';

import { Suspense, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AdbIcon from '@mui/icons-material/Adb';

import { useUnivService } from '@/features/dashboard/hooks/use-univ-service';
import { useGetAppVersionHistoryQuery } from '../../hooks/tanstack/use-get-app-version-history-query';
import AppHistoryItem from './app-history-item';
import EmptyContentBox from './empty-content-box';
import AppVersionHistoryListBoxSkeleton from './skeleton';

const AppHistoryListBox = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const [appType, setAppType] = useState<'A' | 'P'>('P');
  const { currentUniv, currentService } = useUnivService();
  const { data: histories, refetch, isPending } = useGetAppVersionHistoryQuery(currentService?.serviceID, appType);

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
            value="P"
            control={<Radio size="medium" />}
            label={
              <Stack direction={'row'} alignItems={'center'}>
                <DesktopWindowsIcon fontSize="large" sx={{ color: '#1D2951', mr: '0.1rem' }} />
                데스크탑 APP
              </Stack>
            }
          />

          <FormControlLabel
            value="A"
            control={<Radio size="medium" />}
            label={
              <Stack direction={'row'} alignItems={'center'}>
                <AdbIcon fontSize="large" sx={{ color: '#7CB342', mr: '0.1rem' }} />
                안드로이드 APK
              </Stack>
            }
          />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.05)' }} />

      <Suspense fallback={<AppVersionHistoryListBoxSkeleton />}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography
            variant="h6"
            sx={{
              ...(downmd && {
                width: '75%',
                fontSize: '16px',
              }),
            }}
          >{`${currentUniv?.univName}(${currentService?.serviceID}) 앱 버전 히스토리`}</Typography>

          {!!histories?.data?.length && (
            <Typography
              variant="body1"
              color="grey.600"
              sx={{
                ...(downmd && {
                  fontSize: '14px',
                }),
              }}
            >
              총 {histories?.data.length}건
            </Typography>
          )}
        </Stack>

        {histories?.data?.length ? (
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {histories.data.map((history) => (
              <Grid key={history.uploadTime} item xs={12} sm={6} md={6} lg={4} xl={3}>
                <AppHistoryItem item={history} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyContentBox />
        )}
      </Suspense>
    </Stack>
  );
};

export default AppHistoryListBox;
