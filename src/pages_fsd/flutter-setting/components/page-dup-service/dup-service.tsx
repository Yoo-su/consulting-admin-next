'use client';

import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { DupDialog } from './dup-dialog';
import { DupServiceBtn } from './dup-service-button';

export const DupService = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack direction={'row'} alignItems="flex-end" gap={3}>
        <Typography variant="h5">앱 사용자 설정</Typography>
        <DupServiceBtn setOpen={setOpen} />
      </Stack>
      <DupDialog open={open} setOpen={setOpen} />
    </>
  );
};
