'use client';

import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Divider, Stack, SxProps, Typography } from '@mui/material';
import { useCallback } from 'react';

import { useGetCalcConfigQuery } from '../../hooks';
import { useCalculationSettingStore } from '../../models';

type ConfigPreviewCardProps = {
  serviceID: string;
};
export const ConfigPreviewCard = ({ serviceID }: ConfigPreviewCardProps) => {
  const { data } = useGetCalcConfigQuery(serviceID);
  const { openCalculationSettingDialog, setDialogType } =
    useCalculationSettingStore();

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
      <Typography variant={'body2'}>
        서비스의 점수 계산 설정을 관리합니다. 학생부(HSB)와 수능(SAT) 점수
        계산에 필요한 설정을 정의하고, CalcMethodConfig를 참조하여 실제 계산
        로직을 적용합니다
      </Typography>
    </Box>
  );
};

const previewCardStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  bgcolor: '#5d7b6f',
  color: '#fff',
  borderRadius: '1rem',
  padding: 2,
  flexGrow: 1,
  cursor: 'pointer',
  userSelect: 'none',
  minHeight: '380px',
  ':hover': {
    transform: 'translateY(-10px) scale(1.02)',
    animation: 'circle-pulse 1.8s infinite',
  },
  transition: 'all 0.15s ease-in-out',
};
