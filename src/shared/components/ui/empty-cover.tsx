import { Box, SxProps, Typography } from '@mui/material';
import Image from 'next/image';

import mockingbird from '@/shared/assets/svgs/mockingbird.svg';

type EmptyCoverProps = {
  message: string;
  sx?: SxProps;
};
const EmptyCover = ({ message, sx }: EmptyCoverProps) => {
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
        ...sx,
      }}
    >
      <Image src={mockingbird} alt={'empty-bird'} width={64} height={64} />
      <Typography variant="body1" color="grey.600">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyCover;
