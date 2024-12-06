'use client';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { DupDialog } from './dup-dialog';

export const DupServiceBtn = () => {
  const [open, setOpen] = useState(false);

  const handleBtnClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Stack direction={'row'} alignItems="flex-end" gap={3}>
        <Typography variant="h5">앱 사용자 설정</Typography>
        <Button
          disableElevation
          variant="contained"
          size="small"
          sx={{
            padding: '2px 4px 0',
            marginBottom: '2px',
            backgroundColor: '#2C4059',
            color: '#fafafa',
            '&:hover': {
              backgroundColor: '#2C4059',
              color: '#fafafa',
            },
          }}
          onClick={handleBtnClick}
        >
          <FileCopyIcon
            sx={{ marginRight: '2px', fontSize: '1rem', paddingBottom: '2px' }}
          />
          <Typography variant="caption">이전 서비스 설정 복제하기</Typography>
        </Button>
      </Stack>
      <DupDialog open={open} setOpen={setOpen} />
    </>
  );
};
