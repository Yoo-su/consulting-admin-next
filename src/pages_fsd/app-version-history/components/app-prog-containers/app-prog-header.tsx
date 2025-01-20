import { useSharedStore } from '@/shared/models';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { ContainerHeaderClass } from '../../constants';
import { AppHistory } from '../../models';
import { copyText } from '../../services';
import { SerialNoTextField } from '../copy-text-field';

type AppProgHeaderProps = {
  histories: AxiosResponse<AppHistory[], any> | undefined;
};

export const AppProgHeader = ({ histories }: AppProgHeaderProps) => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  const { currentUniv, currentService } = useSharedStore();
  const { serviceID, serialNo } = currentService || {};

  const handleClickCopy = useCallback(async () => {
    if (!serialNo) return;
    await copyText(serialNo);
  }, [serialNo]);

  return (
    <Stack
      direction={'row'}
      alignItems={'top'}
      justifyContent={'space-between'}
    >
      <Stack direction={'column'} justifyItems={'start'} gap={1}>
        <Typography
          variant="h4"
          sx={{ ...(downmd && ContainerHeaderClass) }}
        >{`${currentUniv?.univName}(${serviceID}) 앱 버전 히스토리`}</Typography>
        {!!histories?.data?.length && (
          <Typography
            variant="body1"
            color="grey.600"
            sx={{ ...(downmd && { fontSize: '14px' }) }}
          >
            총 {histories?.data.length}건
          </Typography>
        )}
      </Stack>
      <SerialNoTextField
        serviceID={serviceID ?? ''}
        value={`${serialNo ?? '시리얼번호가 존재하지 않습니다.'}`}
        handleClick={handleClickCopy}
      />
    </Stack>
  );
};
