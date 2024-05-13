'use client';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ExcelItem from './excel-item';
import FoundationLibraryListBoxSkeleton from './skeleton';
import { useUnivService } from '@/shared/hooks/use-univ-service';
import { useGetFoundationLibrariesQuery } from '../../hooks/tanstack/use-get-foudation-libraries-query';

const FoundationLibraryListBox = () => {
  const { currentService } = useUnivService();
  const { data: libraries, isPending } = useGetFoundationLibrariesQuery(currentService?.serviceID);

  if (isPending) return <FoundationLibraryListBoxSkeleton />;

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
      <Typography variant="h6">{`${currentService?.univName}(${currentService?.serviceID}) 기초데이터 엑셀 목록`}</Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {libraries?.data?.map((library) => (
          <Grid key={library.FileName} item lg={4} xs={12} sm={6} md={6}>
            <ExcelItem item={library} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default FoundationLibraryListBox;
