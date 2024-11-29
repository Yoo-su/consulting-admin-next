import { Box, SxProps, Typography } from '@mui/material';
import Image from 'next/image';

import christmasDecorationDoor from '@/shared/assets/svgs/christmasDecorationDoor.svg';

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
      <Image
        src={christmasDecorationDoor}
        alt={'christmasDecorationDoor'}
        width={64}
        height={64}
      />
      <Typography variant="body1" color="grey.600">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyCover;
