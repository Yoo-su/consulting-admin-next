'use client';

import FunctionsIcon from '@mui/icons-material/Functions';
import { Box, Divider, Stack, SxProps, Typography } from '@mui/material';
import { useCallback } from 'react';

import { useSharedStore } from '@/shared/models';

import { METHOD_SETTING_DESCRIPTION } from '../../constants';
import { useGetCalcMethodQuery } from '../../hooks';
import { useCalculationSettingStore } from '../../models';

export const MethodPreviewCard = () => {
  const currentService = useSharedStore((state) => state.currentService);
  const serviceID = currentService?.serviceID ?? '';
  const { data } = useGetCalcMethodQuery(serviceID);
  const { openCalculationSettingDialog, setDialogType } = useCalculationSettingStore();

  const handleClickCard = useCallback(() => {
    setDialogType('method');
    openCalculationSettingDialog();
  }, []);

  return (
    <Box sx={previewCardStyles} onClick={handleClickCard}>
      <Stack direction={'row'} alignItems={'center'} gap={0.5} mb={1}>
        <FunctionsIcon />
        <Typography variant={'h5'}>Method 설정</Typography>
      </Stack>
      <Typography variant={'h6'}>등록된 설정 수: {data?.length}</Typography>
      <Divider sx={{ width: '100%', bgcolor: '#000', mt: 5, mb: 2 }} />
      <Typography variant={'body2'}>{METHOD_SETTING_DESCRIPTION}</Typography>
    </Box>
  );
};

const previewCardStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  border: '0.5px solid rgba(0,0,0,0.1)',
  borderRadius: '1rem',
  padding: 2,
  flexGrow: 1,
  userSelect: 'none',
  cursor: 'pointer',
  minHeight: '380px',
  ':hover': {
    transform: 'translateY(-10px) scale(1.02)',
  },
  transition: 'transform 0.15s ease-in-out',
};
