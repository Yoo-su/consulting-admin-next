'use client';

import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Divider, Stack, SxProps, Typography } from '@mui/material';
import { useCallback } from 'react';

import { useSharedStore } from '@/shared/models';

import { CONFIG_SETTING_DESCRIPTION } from '../../constants';
import { useGetCalcConfigQuery } from '../../hooks';
import { useCalculationSettingStore } from '../../models';

export const ConfigPreviewCard = () => {
  const currentService = useSharedStore((state) => state.currentService);
  const serviceID = currentService?.serviceID ?? '';
  const { data } = useGetCalcConfigQuery(serviceID);
  const { openCalculationSettingDialog, setDialogType } = useCalculationSettingStore();

  const handleClickCard = useCallback(() => {
    setDialogType('config');
    openCalculationSettingDialog();
  }, []);

  return (
    <Box sx={previewCardStyles} onClick={handleClickCard}>
      <Stack direction={'row'} alignItems={'center'} gap={0.5} mb={1}>
        <SettingsIcon />
        <Typography variant={'h5'}>Config 설정</Typography>
      </Stack>
      <Typography variant={'h6'}>등록된 설정 수: {data?.length}</Typography>
      <Divider sx={{ width: '100%', bgcolor: '#fff', mt: 5, mb: 2 }} />
      <Typography variant={'body2'}>{CONFIG_SETTING_DESCRIPTION}</Typography>
    </Box>
  );
};

const previewCardStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  borderRadius: '1rem',
  border: '0.5px solid rgba(0,0,0,0.1)',
  padding: 2,
  flexGrow: 1,
  cursor: 'pointer',
  userSelect: 'none',
  minHeight: '380px',
  ':hover': {
    transform: 'translateY(-10px) scale(1.02)',
  },
  transition: 'all 0.15s ease-in-out',
};
