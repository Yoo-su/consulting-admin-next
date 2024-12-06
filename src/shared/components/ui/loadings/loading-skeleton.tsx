'use client';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

type ContentLoadingSkeletonProps = {
  isTitle?: boolean;
  width?: string;
  height?: string;
};
export const ContentLoadingSkeleton = ({
  isTitle = true,
  width = '100%',
  height = '450px',
}: ContentLoadingSkeletonProps) => {
  return (
    <Stack direction={'column'} sx={{ width: '100%' }}>
      {isTitle && (
        <Skeleton
          variant="text"
          width={'65%'}
          height={'50px'}
          animation="wave"
        />
      )}
      <Skeleton
        variant="rectangular"
        width={width}
        height={height}
        sx={{ mt: 3 }}
        animation="wave"
      />
    </Stack>
  );
};
