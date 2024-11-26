import UploadIcon from '@mui/icons-material/Upload';
import { Fab, styled, Typography } from '@mui/material';
import { memo } from 'react';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3.75),
  right: theme.spacing(3.75),
}));

type UploadButtonProps = {
  queueLen: number;
  handleQueue: (...args: any[]) => any;
};
const UploadButton = ({ queueLen, handleQueue }: UploadButtonProps) => {
  if (!queueLen) return;

  return (
    <StyledFab
      variant="extended"
      color="info"
      size="medium"
      onClick={handleQueue}
    >
      <UploadIcon sx={{ mr: 1 }} />
      <Typography variant="body2">{`${queueLen}개의 파일 업로드`}</Typography>
    </StyledFab>
  );
};

export default memo(UploadButton);
