import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Box, Divider, Stack, SxProps, Typography } from '@mui/material';
import { useCallback } from 'react';

import { useGetCalcConversionTableQuery } from '../../hooks';
import { useCalculationSettingStore } from '../../models';
import AnimatedText from './animated-text';

type ConversionTablePreviewCardProps = {
  serviceID: string;
};
const ConversionTablePreviewCard = ({
  serviceID,
}: ConversionTablePreviewCardProps) => {
  const { data } = useGetCalcConversionTableQuery(serviceID);
  const { openCalculationSettingDialog, setDialogType } =
    useCalculationSettingStore();

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
      <Typography variant={'body2'}>
        <AnimatedText>
          서비스의 점수 변환 테이블을 관리합니다. ScoreConversionTable은
          서비스별 점수 변환 규칙을 저장하고 관리하는 테이블입니다. 다양한
          형태의 점수 체계를 표준화된 방식으로 변환하는 데 사용됩니다
        </AnimatedText>
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
  bgcolor: '#3d5168',
  color: '#fff',
  borderRadius: '1rem',
  padding: 2,
  userSelect: 'none',
  flexGrow: 1,
  cursor: 'pointer',
  minHeight: '380px',
  ':hover': {
    transform: 'translateY(-10px) scale(1.02)',
    animation: 'circle-pulse 1.8s infinite',
  },
  transition: 'transform 0.15s ease-in-out',
};
export default ConversionTablePreviewCard;
