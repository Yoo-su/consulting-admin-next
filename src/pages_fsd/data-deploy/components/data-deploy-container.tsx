'use client';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SyncIcon from '@mui/icons-material/Sync';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AxiosError } from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';

import { ContentWrapper } from '@/shared/components';
import { useMuiAlert } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { useDeployTestDataMutation, useSyncTestDevMutation } from '../hooks';

export const DataDeployContainer = () => {
  const { currentService, currentUniv } = useSharedStore();
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
        setAlertData({
          message: '성공적으로 동기화되었습니다',
          color: 'success',
        });
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
    setAlertData({
      message: '리얼 환경에 데이터를 배포중입니다..',
      color: 'info',
    });
    deployToReal(currentService?.serviceID.toString() ?? '')
      .then((res) => {
        setAlertData({
          message: '성공적으로 데이터가 배포되었습니다',
          color: 'success',
        });
      })
      .catch((err) => {
        setAlertData({
          message: '리얼 환경에 데이터를 배포하던 중 에러가 발생했습니다',
          color: 'error',
        });
      });
  };

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <ContentWrapper.Title title={`${currentUniv?.univName}(${currentService?.serviceID}) 데이터 배포`} />
      </ContentWrapper.Header>
      <ContentWrapper.MainContent>
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          <Stack
            direction={'column'}
            spacing={3}
            sx={{
              mt: upsm ? 6 : 2,
              mb: upsm ? 8 : 4,
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
        </Box>
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

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
