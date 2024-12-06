'use client';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AxiosResponse } from 'axios';
import { Suspense } from 'react';
import toast from 'react-hot-toast';

import { EmptyBox } from '@/shared/components';
import { ContentLoadingSkeleton } from '@/shared/components';
import { useUnivService } from '@/shared/hooks/context/use-univ-service';

import { AppHistory } from '../models';
import { AppProgData } from './app-prog-data';
import { SerialNoTextField } from './copy-only-textfield';

export const AppProgContainer = ({
  histories,
}: {
  histories: AxiosResponse<AppHistory[], any> | undefined;
}) => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();
  const { serviceID, serialNo } = currentService || {};

  const handleClickCopy = () => {
    if (!serialNo) return;
    try {
      navigator.clipboard.writeText(serialNo).then(() => {
        toast.success(<Typography variant="body2">복사되었습니다</Typography>);
      });
    } catch (e) {
      toast.error(<Typography variant="body2">복사에 실패했습니다</Typography>);
    }
  };

  return (
    <Suspense fallback={<ContentLoadingSkeleton />}>
      <Stack
        direction={'row'}
        alignItems={'top'}
        justifyContent={'space-between'}
      >
        <Stack direction={'column'} justifyItems={'start'} gap={1}>
          <Typography
            variant="h4"
            sx={{
              ...(downmd && {
                width: '75%',
                fontSize: '16px',
              }),
            }}
          >{`${currentUniv?.univName}(${serviceID}) 앱 버전 히스토리`}</Typography>
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
        <SerialNoTextField
          serviceID={serviceID ?? ''}
          value={`${serialNo ?? '시리얼번호가 존재하지 않습니다.'}`}
          handleClick={handleClickCopy}
        />
      </Stack>
      {histories?.data?.length ? (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {histories.data.map((history) => (
            <AppProgData key={history.packageFileName} history={history} />
          ))}
        </Grid>
      ) : (
        <EmptyBox text="앱 히스토리가 없습니다" />
      )}
    </Suspense>
  );
};
