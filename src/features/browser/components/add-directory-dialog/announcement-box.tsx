'use client';

import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

import { DIALOG_EMPTY_MESSAGE } from '../../constants';

export const AnnouncementBox = memo(() => {
  return (
    <Stack
      width={'100%'}
      height={'180px'}
      direction="column"
      justifyContent="center"
      alignItems="center"
      color="#808080"
    >
      <AnnouncementOutlinedIcon color="inherit" sx={{ width: '50px', height: '50px' }} />
      <Typography variant="body2" color="inherit">
        {DIALOG_EMPTY_MESSAGE}
      </Typography>
    </Stack>
  );
});
AnnouncementBox.displayName = 'AnnouncementBox';
