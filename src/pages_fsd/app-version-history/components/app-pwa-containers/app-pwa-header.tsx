import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { MouseEvent } from 'react';
import { ContainerHeaderClass } from '../../constants';
import { copyText } from '../../services';
import { SerialNoTextField } from '../copy-text-field';

type AppPWAHeaderProps = {
  univName: string | undefined;
  serviceID: string | undefined;
  serialNo: string | undefined;
};

export const AppPWAHeader = ({
  univName,
  serviceID,
  serialNo,
}: AppPWAHeaderProps) => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!serialNo) return;
    await copyText(serialNo);
  };

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Typography variant="h6" sx={{ ...(downmd && ContainerHeaderClass) }}>
        {`${univName}(${serviceID}) PWA 앱 주소`}
      </Typography>
      <SerialNoTextField
        serviceID={serviceID ?? ''}
        value={serialNo ?? '시리얼번호가 존재하지 않습니다.'}
        handleClick={handleClickCopy}
      />
    </Stack>
  );
};
