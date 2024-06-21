'use client';

import Stack from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import PuffLoader from 'react-spinners/PuffLoader';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import SyncIcon from '@mui/icons-material/Sync';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import { useDeployTestDataMutation } from '../../hooks/tanstack/use-deploy-test-data-mutation';
import { useSyncTestDevMutation } from '../../hooks/tanstack/use-sync-test-dev-mutation';
import { useUnivService } from '../../hooks/context/use-univ-service';
import { useMuiAlert } from '@/shared/hooks/use-mui-alert';
import { AxiosError } from 'axios';
import ContentWrapper from '@/shared/components/content-wrapper';

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
  const { isPending: isRealDeploying, mutateAsync: deployToReal } = useDeployTestDataMutation();
  const { isPending: isSynchronizingTestDev, mutateAsync: syncFromTestToDev } = useSyncTestDevMutation();
  const { alertData, setAlertData } = useMuiAlert();

  const theme = useTheme();
  const upsm = useMediaQuery(theme.breakpoints.up('sm'));

  // 테스트 환경 동기화 버튼 클릭 처리
  const handleTestDeployBtnClick = () => {
    setAlertData({ message: 'DB 동기화 중입니다..', color: 'info' });
    syncFromTestToDev(currentService?.serviceID.toString() ?? '')
      .then((res) => {
        setAlertData({ message: '성공적으로 동기화되었습니다', color: 'success' });
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          setAlertData({
            message: err?.response?.data?.errorMessage,
            color: 'error',
          });
        } else {
          setAlertData({
            message: `데이터 동기화 중 에러가 발생했습니다`,
            color: 'error',
          });
        }
      });
  };

  // 리얼 배포 버튼 클릭 처리
  const handleRealDeployBtnClick = () => {
    setAlertData({ message: '리얼 환경에 데이터를 배포중입니다..', color: 'info' });
    deployToReal(currentService?.serviceID.toString() ?? '')
      .then((res) => {
        setAlertData({ message: '성공적으로 데이터가 배포되었습니다', color: 'success' });
      })
      .catch((err) => {
        setAlertData({ message: '리얼 환경에 데이터를 배포하던 중 에러가 발생했습니다', color: 'error' });
      });
  };

  return (
    <ContentWrapper>
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
                <CircularProgress size={16} />
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
          disabled={isSynchronizingTestDev || isRealDeploying}
        >
          {isSynchronizingTestDev ? (
            <PuffLoader color={'#fff'} size={30} />
          ) : (
            <Typography variant="h6" fontWeight={'bold'}>
              <Stack direction={'row'} alignItems={'center'}>
                <SyncIcon fontSize="inherit" sx={{ mr: 1 }} />
                DB 동기화 (TEST → DEV)
              </Stack>
            </Typography>
          )}
        </StyledButton>
        <StyledButton
          onClick={handleRealDeployBtnClick}
          bgcolor={'#94C0DD'}
          disabled={isSynchronizingTestDev || isRealDeploying}
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
    </ContentWrapper>
  );
};

export default DataDeployBox;
