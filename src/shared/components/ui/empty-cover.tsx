import { Box, SxProps, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import candyCane from '@/shared/assets/svgs/candyCane.svg';
import christmasDecorationDoor from '@/shared/assets/svgs/christmasDecorationDoor.svg';
import hotChocoMug from '@/shared/assets/svgs/hotChocoMug.svg';
import mockingbird from '@/shared/assets/svgs/mockingbird.svg';
import snowSleigh from '@/shared/assets/svgs/snowSleigh.svg';
import turtle from '@/shared/assets/svgs/turtle.svg';

type EmptyCoverProps = {
  message: string;
  sx?: SxProps;
};
export const EmptyCover = ({ message, sx }: EmptyCoverProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const today = new Date();
  const christmasSeason = [
    new Date(today.getFullYear(), 10, 1),
    new Date(today.getFullYear(), 11, 31),
  ];

  const isChristmas = useMemo(
    () => christmasSeason[0] <= today && today <= christmasSeason[1],
    [today]
  );

  const christmasImages = [
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
  const images = [
    {
      src: mockingbird,
      alt: 'mockingbird',
    },
    {
      src: turtle,
      alt: 'turtle',
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
        src={
          isChristmas
            ? christmasImages[selectedImage].src
            : images[selectedImage].src
        }
        alt={
          isChristmas
            ? christmasImages[selectedImage].alt
            : images[selectedImage].alt
        }
        width={64}
        height={64}
      />
      <Typography variant="body1" color="grey.600">
        {message}
      </Typography>
    </Box>
  );
};
