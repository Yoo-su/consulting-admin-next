import { Box, styled } from '@mui/material';
import { memo } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import { useFoundationUploadMutation } from '../hooks';

export const LoadingCover = memo(() => {
  const { isUploading } = useFoundationUploadMutation();

  if (!isUploading) return;

  return (
    <LoadingBox>
      <PulseLoader color={'#36D7B7'} />
    </LoadingBox>
  );
});
LoadingCover.displayName = 'LoadingCover';

const LoadingBox = styled(Box)({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '70%',
  height: '280px',
  bgcolor: 'rgba(255,255,255,0.5)',
});
