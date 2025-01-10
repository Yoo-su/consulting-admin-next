'use client';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MouseEvent, useMemo } from 'react';
import toast from 'react-hot-toast';

import { useSharedStore } from '@/shared/models';
import { isCurrentServiceYear } from '@/shared/services';

import { RealURL, TestURL } from '../constants';
import { SerialNoTextField, URlAddressTextField } from './copy-only-textfield';

export const AppPWAContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useSharedStore();
  const { univEngName, univName } = currentUniv || {};
  const { schoolYear, isSusi, serviceID, serialNo } = currentService || {};
  // 현 서비스학년도와 비교하여 현재 서비스 중인지 확인
  const isCurrentYear = isCurrentServiceYear(schoolYear ?? '');
  const prevLocation = isCurrentYear
    ? ''
    : `/${schoolYear}${isSusi === '1' ? 'susi' : 'jungsi'}`;
  const [testUrl, realUrl] = useMemo(
    () => [
      `${TestURL}${prevLocation}/${univEngName}-pwa.html`,
      `${RealURL}${prevLocation}/${univEngName}-pwa.html`,
    ],
    [prevLocation, univEngName]
  );

  const handleClickCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const id = event.currentTarget.id;
    if (id === 'serialnumber' && !serialNo) return;
    const copiedText =
      id === 'serialnumber'
        ? serialNo!
        : id.includes('test')
        ? testUrl
        : realUrl;
    try {
      await navigator.clipboard.writeText(copiedText);
      toast.success(<Typography variant="body2">복사되었습니다</Typography>);
    } catch (e) {
      toast.error(<Typography variant="body2">복사에 실패했습니다</Typography>);
    }
  };

  return (
    <Stack direction={'column'} spacing={4} sx={{ paddingBottom: '.5rem' }}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography
          variant="h6"
          sx={{
            ...(downmd && {
              width: '75%',
              fontSize: '16px',
            }),
          }}
        >
          {`${univName}(${serviceID}) PWA 앱 주소`}
        </Typography>
        <SerialNoTextField
          serviceID={serviceID ?? ''}
          value={serialNo ?? '시리얼번호가 존재하지 않습니다.'}
          handleClick={handleClickCopy}
        />
      </Stack>
      <Stack direction={'column'} spacing={1}>
        <Typography variant="overline">Test</Typography>
        <URlAddressTextField
          url={testUrl}
          id={`${serviceID}-test`}
          handleClick={handleClickCopy}
        />
      </Stack>
      {isCurrentYear && (
        <Stack direction={'column'} spacing={1}>
          <Typography variant="overline">Real</Typography>
          <URlAddressTextField
            url={realUrl}
            id={`${serviceID}-real`}
            handleClick={handleClickCopy}
          />
        </Stack>
      )}
    </Stack>
  );
};
