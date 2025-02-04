import { Skeleton, Stack } from '@mui/material';

export const BoardSkeleton = () => {
  return (
    <Stack direction={'column'}>
      <Skeleton variant="text" sx={{ fontSize: '2rem', my: 1 }} animation="pulse" />
      <Skeleton variant="rectangular" width={'100%'} height={'400px'} animation="pulse" />
    </Stack>
  );
};
