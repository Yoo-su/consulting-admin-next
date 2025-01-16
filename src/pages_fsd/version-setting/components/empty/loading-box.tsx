import { ContentLoadingSkeleton } from '@/shared/components';
import { Box } from '@mui/material';

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
