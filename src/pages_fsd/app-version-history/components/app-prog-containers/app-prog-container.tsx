'use client';

import Grid from '@mui/material/Grid';
import { AxiosResponse } from 'axios';
import { Suspense } from 'react';

import { ContentLoadingSkeleton, EmptyBox } from '@/shared/components';

import { AppHistory } from '../../models';
import { AppProgData } from './app-prog-data';
import { AppProgHeader } from './app-prog-header';

export const AppProgContainer = ({ histories }: { histories: AxiosResponse<AppHistory[], any> | undefined }) => {
  return (
    <Suspense fallback={<ContentLoadingSkeleton />}>
      <AppProgHeader histories={histories} />

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
