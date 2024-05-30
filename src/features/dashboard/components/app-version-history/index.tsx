'use client';

import { Suspense, useState, useEffect, MouseEvent } from 'react';
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

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AdbIcon from '@mui/icons-material/Adb';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useGetAppVersionHistoryQuery } from '../../hooks/tanstack/use-get-app-version-history-query';
import AppHistoryItem from './app-history-item';
import EmptyContentBox from './empty-content-box';
import AppVersionHistoryListBoxSkeleton from './skeleton';
import toast from 'react-hot-toast';
import { IconButton } from '@mui/material';

const AppHistoryListBox = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const [appType, setAppType] = useState<'O' | 'A' | 'P'>('O');
  const { currentUniv, currentService } = useUnivService();
  const {
    data: histories,
    refetch,
    isPending,
  } = useGetAppVersionHistoryQuery(currentService?.serviceID, appType === 'O' ? null : appType);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appType]);

  const handleClickCopy = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!currentService?.serialNo) return;

    const target = document.getElementById(
      `${currentService?.serviceID}-${event.currentTarget.id}` || ''
    ) as HTMLInputElement;
    try {
      navigator.clipboard.writeText(target?.value || '');
      toast.success('복사되었습니다');
    } catch (e) {
      toast.error('복사에 실패했습니다');
    }
  };

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

      {appType == 'O' ? (
        <Stack direction={'column'} spacing={4} sx={{ paddingBottom: '.5rem' }}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography
              variant="h6"
              sx={{
                ...(downmd && {
                  width: '75%',
                  fontSize: '16px',
                }),
              }}
            >
              {`${currentUniv?.univName}(${currentService?.serviceID}) PWA 앱 주소`}
            </Typography>
            <TextField
              disabled
              size="small"
              label="시리얼번호"
              sx={{
                minWidth: '350px',
                textWrap: 'noWrap',
                '& .Mui-disabled': { color: 'black !important' },
              }}
              value={`${currentService?.serialNo || '시리얼번호가 존재하지 않습니다.'}`}
              id={`${currentService?.serviceID}-serialnumber`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple aria-label="copy text" onClick={handleClickCopy} id="serialnumber">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="overline">Test</Typography>
            <TextField
              disabled
              fullWidth
              id={`${currentService?.serviceID}-testPwa`}
              value={`https://vapplytest.jinhakapply.com/consultinghtmlv4/${currentUniv?.univEngName}.html`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple aria-label="copy text" onClick={handleClickCopy} id="testPwa">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="overline">Real</Typography>
            <TextField
              disabled
              fullWidth
              id={`${currentService?.serviceID}-realPwa`}
              value={`https://consultingapp.jinhakapply.com/ConsultingHtml/${currentUniv?.univEngName}-pwa.html`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple aria-label="copy text" onClick={handleClickCopy} id="realPwa">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>
      ) : (
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
      )}
    </Stack>
  );
};

export default AppHistoryListBox;
