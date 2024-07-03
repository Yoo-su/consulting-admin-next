'use client';

import { Suspense } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ExcelItem from './excel-item';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useGetFoundationLibrariesQuery } from '../../hooks/tanstack/use-get-foudation-libraries-query';
import EmptyBox from '@/shared/components/empty-box';

const FoundationLibraryListBox = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();
  const { data: libraries } = useGetFoundationLibrariesQuery(currentService?.serviceID);

  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        p: 2,
      }}
    >
      <Suspense fallback={<ContentLoadingSkeleton />}>
        <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'}>
          <Typography
            variant="h6"
            sx={{
              ...(downmd && {
                width: '75%',
                fontSize: '16px',
              }),
            }}
          >{`${currentUniv?.univName}(${currentService?.serviceID}) 기초데이터 엑셀 목록`}</Typography>

          {!!libraries?.data?.length && (
            <Typography
              variant="body1"
              color="grey.600"
              whiteSpace={'nowrap'}
              sx={{
                ...(downmd && {
                  fontSize: '14px',
                }),
              }}
            >
              총 {libraries?.data.length}건
            </Typography>
          )}
        </Stack>

        {libraries?.data?.length ? (
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {libraries.data.map((library) => (
              <Grid key={library.fileName} item xs={12} sm={6} md={6} lg={4} xl={3}>
                <ExcelItem item={library} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyBox text="업로드된 엑셀이 없습니다" />
        )}
      </Suspense>
    </Stack>
  );
};

export default FoundationLibraryListBox;
