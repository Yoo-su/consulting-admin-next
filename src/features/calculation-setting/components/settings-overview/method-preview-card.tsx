import FunctionsIcon from '@mui/icons-material/Functions';
import { Box, Divider, Stack, SxProps, Typography } from '@mui/material';
import { useCallback } from 'react';

import { useGetCalcMethodQuery } from '../../hooks';
import { useCalculationSettingStore } from '../../models';
import AnimatedText from './animated-text';

type MethodPreviewCardProps = {
  serviceID: string;
};
const MethodPreviewCard = ({ serviceID }: MethodPreviewCardProps) => {
  const { data } = useGetCalcMethodQuery(serviceID);
  const { openCalculationSettingDialog, setDialogType } =
    useCalculationSettingStore();

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
      <Typography variant={'body2'}>
        <AnimatedText>
          서비스의 점수 계산 메서드를 관리합니다. ScoreCalcMethodConfig는 점수
          계산 방식의 상세 로직을 정의하는 테이블입니다. 학생부(HSB)와 수능(SAT)
          점수 계산에 필요한 단계별 계산 방식을 JSON 형태로 저장하여 관리합니다.
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
  bgcolor: '#eae7d6',
  borderRadius: '1rem',
  padding: 2,
  flexGrow: 1,
  userSelect: 'none',
  cursor: 'pointer',
  minHeight: '380px',
  ':hover': {
    transform: 'translateY(-10px) scale(1.02)',
    animation: 'circle-pulse 1.8s infinite',
  },
  transition: 'transform 0.15s ease-in-out',
};
export default MethodPreviewCard;
