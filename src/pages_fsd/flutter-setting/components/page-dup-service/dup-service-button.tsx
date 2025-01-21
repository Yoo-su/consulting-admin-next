'use client';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { DupBtnClass } from '../../constants/classes';

type DupServiceBtnProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export const DupServiceBtn = ({ setOpen }: DupServiceBtnProps) => {
  const handleBtnClick = () => {
    setOpen(true);
  };

  return (
    <Button
      disableElevation
      variant="contained"
      size="small"
      sx={DupBtnClass}
      onClick={handleBtnClick}
    >
      <FileCopyIcon
        sx={{ marginRight: '2px', fontSize: '1rem', paddingBottom: '2px' }}
      />
      <Typography variant="caption">이전 서비스 설정 복제하기</Typography>
    </Button>
  );
};
