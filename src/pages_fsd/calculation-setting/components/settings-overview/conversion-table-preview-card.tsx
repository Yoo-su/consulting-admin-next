'use client';

import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Box, Divider, Stack, SxProps, Typography } from '@mui/material';
import { useCallback } from 'react';

import { useSharedStore } from '@/shared/models';

import { CONVERSION_TABLE_SETTING_DESCRIPTION } from '../../constants';
import { useGetCalcConversionTableQuery } from '../../hooks';
import { useCalculationSettingStore } from '../../models';

export const ConversionTablePreviewCard = () => {
  const currentService = useSharedStore((state) => state.currentService);
  const serviceID = currentService?.serviceID ?? '';
  const { data } = useGetCalcConversionTableQuery(serviceID);
  const { openCalculationSettingDialog, setDialogType } = useCalculationSettingStore();

  const handleClickCard = useCallback(() => {
    setDialogType('conversionTable');
    openCalculationSettingDialog();
  }, []);

  return (
    <Box sx={previewCardStyles} onClick={handleClickCard}>
      <Stack direction={'row'} alignItems={'center'} gap={0.5} mb={1}>
        <BackupTableIcon />
        <Typography variant={'h5'}>점수변환 테이블 설정</Typography>
      </Stack>
      <Typography variant={'h6'}>등록된 설정 수: {data?.length}</Typography>
      <Divider sx={{ width: '100%', bgcolor: '#fff', mt: 5, mb: 2 }} />
      <Typography variant={'body2'}>{CONVERSION_TABLE_SETTING_DESCRIPTION}</Typography>
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
  userSelect: 'none',
  flexGrow: 1,
  cursor: 'pointer',
  minHeight: '380px',
  ':hover': {
    transform: 'translateY(-10px) scale(1.02)',
  },
  transition: 'transform 0.15s ease-in-out',
};
