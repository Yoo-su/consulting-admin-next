import { Box } from '@mui/material';

import { ContentLoadingSkeleton } from '@/shared/components';

export const LoadingBox = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ContentLoadingSkeleton
        isTitle={false}
        width={'500px'}
        height={'700px'}
      />
    </Box>
  );
};
