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

const AppPWAContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();

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

  // 현 서비스학년도와 비교하여 현재 서비스 중인지 확인

  const isCurrentYear = isCurrentServiceYear(currentService?.schoolYear || '');
  const URLTextField = ({ id }: { id: string }) => {
    const currentEngName = currentUniv?.univEngName;
    const domain = id.includes('test') ? 'vapplytest' : 'consultingapp';
    const location = id.includes('test') ? 'consultinghtmlv4' : 'ConsultingHtml';
    const prevLocation = isCurrentYear
      ? ''
      : `/${currentService?.schoolYear}/${currentService?.isSusi == 1 ? 'susi' : 'jungsi'}`;
    const pwa = id.includes('test') ? '' : '-pwa';
    const url = `https://${domain}.jinhakapply.com/${location}${prevLocation}/${currentEngName}${pwa}.html`;

    return (
      <TextField
        disabled
        fullWidth
        id={`${currentService?.serviceID}-${id}`}
        value={url}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disableRipple aria-label="copy text" onClick={handleClickCopy} id={id}>
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
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
        <URLTextField id="testPwa" />
      </Stack>
      {isCurrentYear && (
        <Stack direction={'column'} spacing={1}>
          <Typography variant="overline">Real</Typography>
          <URLTextField id="realPwa" />
        </Stack>
      )}
    </Stack>
  );
};

export default AppPWAContainer;
