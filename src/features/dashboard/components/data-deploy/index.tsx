'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import PuffLoader from 'react-spinners/PuffLoader';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import { useDeployTestDataMutation } from '../../hooks/tanstack/use-deploy-test-data-mutation';
import { useUnivService } from '../../hooks/use-univ-service';
import { useMuiAlert } from '@/shared/hooks/use-mui-alert';

interface StyledButtonProps extends ButtonProps {
  bgcolor?: string;
}
const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'bgcolor',
})<StyledButtonProps>(({ theme, bgcolor }) => ({
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  borderRadius: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '2rem',
  cursor: 'pointer',
  color: '#fff',
  backgroundColor: bgcolor || theme.palette.primary.main, // 커스텀 bgcolor 적용
  '&:hover': {
    backgroundColor: bgcolor || theme.palette.primary.main,
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  width: '100%',
  height: '6rem',
  transition: 'all 0.1s ease-in-out',
}));

const DataDeployBox = () => {
  const { currentService, currentUniv } = useUnivService();
  const { isPending: isRealDeploying, mutateAsync: deployToReal } = useDeployTestDataMutation(
    currentService?.serviceID.toString() ?? ''
  );
  const { alertData, setAlertData } = useMuiAlert();

  const [isTestDeploying, setIsTestDeploying] = useState(false);
  //const [isRealDeploying, setIsRealDeploying] = useState(false);
  const theme = useTheme();
  const upsm = useMediaQuery(theme.breakpoints.up('sm'));

  // 테스트 배포 버튼 클릭 처리
  const handleTestDeployBtnClick = () => {
    setIsTestDeploying(true);
    setAlertData({ message: '테스트 환경에 데이터를 배포중입니다..', color: 'info' });
    setTimeout(() => {
      setIsTestDeploying(false);
      setAlertData({ message: '성공적으로 데이터가 배포되었습니다', color: 'success' });
    }, 3000);
  };

  // 리얼 배포 버튼 클릭 처리
  const handleRealDeployBtnClick = async () => {
    setAlertData({ message: '리얼 환경에 데이터를 배포중입니다..', color: 'info' });
    await deployToReal();
    setAlertData({ message: '성공적으로 데이터가 배포되었습니다', color: 'success' });
  };

  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        p: 2,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        textAlign={'left'}
        width={'100%'}
      >{`${currentUniv?.univName}(${currentService?.serviceID}) 데이터 배포`}</Typography>
      <Stack
        direction={'column'}
        spacing={3}
        sx={{
          mt: upsm ? 8 : 4,
          p: 4,
          justifyContent: 'center',
          alignItems: 'center',
          width: { xs: '70%', sm: '70%', md: '45%', lg: '40%', xl: '40%' },
        }}
      >
        {alertData && (
          <Alert
            icon={
              alertData.color === 'info' ? (
                <HourglassTopIcon fontSize={'inherit'} />
              ) : alertData.color === 'success' ? (
                <CheckCircleIcon fontSize={'inherit'} />
              ) : (
                <ErrorIcon fontSize={'inherit'} />
              )
            }
            color={alertData.color}
            sx={{
              my: upsm ? 2 : 0,
              alignItems: 'center',
              mx: 'auto',
              flexGrow: 1,
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <StyledButton
          onClick={handleTestDeployBtnClick}
          bgcolor={'#C2E0AE'}
          color="inherit"
          disabled={isTestDeploying || isRealDeploying}
        >
          {isTestDeploying ? (
            <PuffLoader color={'#fff'} size={30} />
          ) : (
            <Typography variant="h6" fontWeight={'bold'}>
              <Stack direction={'row'} alignItems={'center'}>
                <ArrowCircleUpIcon fontSize="inherit" sx={{ mr: 1 }} /> 테스트 배포
              </Stack>
            </Typography>
          )}
        </StyledButton>
        <StyledButton
          onClick={handleRealDeployBtnClick}
          bgcolor={'#94C0DD'}
          disabled={isTestDeploying || isRealDeploying}
        >
          {isRealDeploying ? (
            <PuffLoader color={'#fff'} size={30} />
          ) : (
            <Typography variant="h6" fontWeight={'bold'}>
              <Stack direction={'row'} alignItems={'center'}>
                <ArrowCircleUpIcon fontSize="inherit" sx={{ mr: 1 }} /> 리얼 배포
              </Stack>
            </Typography>
          )}
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export default DataDeployBox;
