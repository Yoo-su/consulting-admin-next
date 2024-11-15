'use client';

import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DOMAttributes } from 'react';

type EmptyBoxProps = {
  text: string;
} & DOMAttributes<HTMLDivElement>;

const EmptyBox = ({ text, ...props }: EmptyBoxProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '450px',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 3,
      }}
      {...props}
    >
      <Stack
        direction={'column'}
        spacing={1}
        sx={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '1rem',
          bgcolor: 'rgba(0,0,0,0.03)',
        }}
      >
        <SdCardAlertIcon sx={{ fontSize: '80px', color: 'rgba(0,0,0,0.65)' }} />
        <Typography variant="body2" color="grey.700">
          {text}
        </Typography>
      </Stack>
    </Box>
  );
};

export default EmptyBox;
