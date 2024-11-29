import { Box, SxProps, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import candyCane from '@/shared/assets/svgs/candyCane.svg';
import christmasDecorationDoor from '@/shared/assets/svgs/christmasDecorationDoor.svg';
import hotChocoMug from '@/shared/assets/svgs/hotChocoMug.svg';
import snowSleigh from '@/shared/assets/svgs/snowSleigh.svg';

type EmptyCoverProps = {
  message: string;
  sx?: SxProps;
};
const EmptyCover = ({ message, sx }: EmptyCoverProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    {
      src: christmasDecorationDoor,
      alt: 'christmasDecorationDoor',
    },
    {
      src: snowSleigh,
      alt: 'snowSleigh',
    },
    {
      src: hotChocoMug,
      alt: 'hotChocoMug',
    },
    {
      src: candyCane,
      alt: 'candyCane',
    },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(randomIndex);
  }, []);
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
        src={images[selectedImage].src}
        alt={images[selectedImage].alt}
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
