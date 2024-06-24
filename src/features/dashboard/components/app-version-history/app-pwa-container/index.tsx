'use client';

import { MouseEvent } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import toast from 'react-hot-toast';

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { isCurrentServiceYear } from '@/features/dashboard/services/is-current-service-year';
import SerialNoTextField from '../copy-only-textfield/SerialNoTextField';
import URlAddressTextField from '../copy-only-textfield/UrlAddressTextField';

const AppPWAContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();

  // 현 서비스학년도와 비교하여 현재 서비스 중인지 확인
  const isCurrentYear = isCurrentServiceYear(currentService?.schoolYear || '');
  const prevLocation = isCurrentYear
    ? ''
    : `/${currentService?.schoolYear}${currentService?.isSusi === '1' ? 'susi' : 'jungsi'}`;
  const testUrl = `https://vapplytest.jinhakapply.com/consultinghtmlv4${prevLocation}/${currentUniv?.univEngName}-pwa.html`;
  const realUrl = `https://consultingapp.jinhakapply.com/ConsultingHtml${prevLocation}/${currentUniv?.univEngName}-pwa.html`;

  const handleClickCopy = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!currentService?.serialNo) return;
    const isTest = event.currentTarget.id === 'test';
    console.log('clicked', event.currentTarget.id, isTest);
    try {
      navigator.clipboard.writeText(isTest ? testUrl : realUrl);
      toast.success('복사되었습니다');
    } catch (e) {
      toast.error('복사에 실패했습니다');
    }
  };

  return (
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
        <SerialNoTextField
          serviceID={currentService?.serviceID || ''}
          value={`${currentService?.serialNo || '시리얼번호가 존재하지 않습니다.'}`}
          handleClick={handleClickCopy}
        />
      </Stack>
      <Stack direction={'column'} spacing={1}>
        <Typography variant="overline">Test</Typography>
        <URlAddressTextField url={testUrl} id="test" handleClick={handleClickCopy} />
      </Stack>
      {isCurrentYear && (
        <Stack direction={'column'} spacing={1}>
          <Typography variant="overline">Real</Typography>
          <URlAddressTextField url={realUrl} id="real" handleClick={handleClickCopy} />
        </Stack>
      )}
    </Stack>
  );
};

export default AppPWAContainer;
