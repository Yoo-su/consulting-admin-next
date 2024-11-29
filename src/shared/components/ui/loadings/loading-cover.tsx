import { Box, Typography } from '@mui/material';
import HashLoader from 'react-spinners/HashLoader';

type LoadingCoverProps = {
  loadingMessage?: string;
};
const LoadingCover = ({
  loadingMessage = '로딩중입니다...',
}: LoadingCoverProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <HashLoader color={'#36D7B7'} size={60} />
      <Typography variant="body1" color="grey.500" marginTop={'1rem'}>
        {loadingMessage}
      </Typography>
    </Box>
  );
};

export default LoadingCover;
