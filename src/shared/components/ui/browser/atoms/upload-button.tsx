import { memo } from 'react';
import { Fab, Typography, styled } from '@mui/material';
import { useShallow } from 'zustand/shallow';

import UploadIcon from '@mui/icons-material/Upload';
import { useQueueStore } from '@/shared/models/stores';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3.75),
  right: theme.spacing(3.75),
}));

type UploadButtonProps = {
  handleUploadQueue: () => Promise<void>;
};
const UploadButton = ({ handleUploadQueue }: UploadButtonProps) => {
  const queueFiles = useQueueStore(useShallow((state) => state.queueFiles));

  if (!queueFiles.length) return;

  return (
    <StyledFab variant="extended" color="info" size="medium" onClick={handleUploadQueue}>
      <UploadIcon sx={{ mr: 1 }} />
      <Typography variant="body2">{`${queueFiles.length}개의 파일 업로드`}</Typography>
    </StyledFab>
  );
};

export default memo(UploadButton);
