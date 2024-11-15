import UploadIcon from '@mui/icons-material/Upload';
import { Fab, styled, Typography } from '@mui/material';
import { memo } from 'react';
import { useShallow } from 'zustand/shallow';

import { QueueType, useQueueStore } from '@/shared/models/stores';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3.75),
  right: theme.spacing(3.75),
}));

type UploadButtonProps = {
  handleUploadBrowserQueue: (
    queue: File[],
    queueType: QueueType
  ) => Promise<void>;
};
const UploadButton = ({ handleUploadBrowserQueue }: UploadButtonProps) => {
  const browserQueue = useQueueStore(useShallow((state) => state.browserQueue));

  if (!browserQueue.length) return;

  return (
    <StyledFab
      variant="extended"
      color="info"
      size="medium"
      onClick={() => {
        handleUploadBrowserQueue(browserQueue, 'browser');
      }}
    >
      <UploadIcon sx={{ mr: 1 }} />
      <Typography variant="body2">{`${browserQueue.length}개의 파일 업로드`}</Typography>
    </StyledFab>
  );
};

export default memo(UploadButton);
