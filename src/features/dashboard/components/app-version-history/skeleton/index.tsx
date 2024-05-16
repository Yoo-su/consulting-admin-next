'use client';

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const AppVersionHistoryListBoxSkeleton = () => {
  return (
    <Stack direction={'column'} sx={{ mt: 5 }}>
      <Skeleton variant="text" width={'65%'} height={'50px'} animation="wave" />
      <Skeleton variant="rectangular" width={'100%'} height={'450px'} sx={{ mt: 3 }} animation="wave" />
    </Stack>
  );
};

export default AppVersionHistoryListBoxSkeleton;
