'use client';

import { Suspense } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppHistoryItem from '../app-history-item';
import EmptyContentBox from '../empty-content-box';
import AppVersionHistoryListBoxSkeleton from '../skeleton';

import { useUnivService } from '@/features/dashboard/hooks/use-univ-service';
import { AxiosResponse } from 'axios';
import { AppHistory } from '@/features/dashboard/types/app-history.type';

const AppProgContainer = ({ histories }: { histories: AxiosResponse<AppHistory[], any> | undefined }) => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();

  return (
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
  );
};

export default AppProgContainer;
