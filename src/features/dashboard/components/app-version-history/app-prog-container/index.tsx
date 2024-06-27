'use client';

import { Suspense, MouseEvent } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppHistoryItem from '../app-history-item';
import EmptyBox from '@/shared/components/empty-box';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';

import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { AxiosResponse } from 'axios';
import { AppHistory } from '@/features/dashboard/types/app-history.type';
import toast from 'react-hot-toast';
import SerialNoTextField from '../copy-only-textfield/SerialNoTextField';

const AppProgContainer = ({ histories }: { histories: AxiosResponse<AppHistory[], any> | undefined }) => {
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

  return (
    <Suspense fallback={<ContentLoadingSkeleton />}>
      <Stack direction={'row'} alignItems={'top'} justifyContent={'space-between'}>
        <Stack direction={'column'} justifyItems={'start'}>
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
              variant="caption"
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
          serviceID={currentService?.serviceID || ''}
          value={`${currentService?.serialNo || '시리얼번호가 존재하지 않습니다.'}`}
          handleClick={handleClickCopy}
        />
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
        <EmptyBox text="앱 히스토리가 없습니다" />
      )}
    </Suspense>
  );
};

export default AppProgContainer;
