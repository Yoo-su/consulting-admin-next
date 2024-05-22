'use client';

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const FoundationLibraryListBoxSkeleton = () => {
  return (
    <Stack direction={'column'} sx={{ mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 } }}>
      <Skeleton variant="text" width={'65%'} height={'50px'} animation="wave" />
      <Skeleton variant="rectangular" width={'100%'} height={'450px'} sx={{ mt: 3 }} animation="wave" />
    </Stack>
  );
};

export default FoundationLibraryListBoxSkeleton;
