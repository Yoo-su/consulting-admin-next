'use client';

import { Suspense } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ExcelItem from './excel-item';
import FoundationLibraryListBoxSkeleton from './skeleton';
import { useUnivService } from '@/shared/hooks/use-univ-service';
import { useGetFoundationLibrariesQuery } from '../../hooks/tanstack/use-get-foudation-libraries-query';
import EmptyContentBox from './empty-content-box';

const FoundationLibraryListBox = () => {
  const { currentService } = useUnivService();
  const { data: libraries, isPending } = useGetFoundationLibrariesQuery(currentService?.serviceID);

  return (
    <Stack
      direction={'column'}
      sx={{
        mt: 5,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        p: 2,
      }}
    >
      <Suspense fallback={<FoundationLibraryListBoxSkeleton />}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h6">{`${currentService?.univName}(${currentService?.serviceID}) 기초데이터 엑셀 목록`}</Typography>

          {!!libraries?.data?.length && (
            <Typography variant="body1" color="grey.600">
              총 {libraries?.data.length}건
            </Typography>
          )}
        </Stack>

        {libraries?.data?.length ? (
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {libraries.data.map((library) => (
              <Grid key={library.FileName} item xs={12} sm={6} md={6} lg={4} xl={3}>
                <ExcelItem item={library} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyContentBox />
        )}
      </Suspense>
    </Stack>
  );
};

export default FoundationLibraryListBox;
