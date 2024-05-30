'use client';

import { useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import PulseLoader from 'react-spinners/PulseLoader';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AdbIcon from '@mui/icons-material/Adb';

import { useHandleApp } from '@/features/dashboard/hooks/use-handle-app';
import { useStepper } from '@/shared/hooks/use-stepper';
import { useUnivService } from '../../hooks/context/use-univ-service';
import ColorlibStepIcon from '@/shared/components/stepper/color-lib-step-icon';
import { ColorlibConnector } from '@/shared/components/stepper/styled';
import { APP_DEPLOY_STEPS } from '@/features/dashboard/constants/app-deploy-steps';
import apkIcon from '@/shared/assets/images/apk_64.png';

const AppDeployBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const title = `${currentUniv?.univName}(${currentService?.serviceID}) 앱 배포`;
  const { appType, setAppType, appFile, setAppFile, alertData, deploy, isDeploying, deploySuccess } = useHandleApp();
  const { activeStep, skipped, handleNext, handleBack, handleSkip, handleReset } = useStepper();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 배포 버튼 클릭 처리
  const handleClickUploadBtn = () => {
    if (isDeploying) return;
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setAppFile(selectedFile);
    if (selectedFile) {
      if (activeStep === 0) handleNext();
    } else handleBack();
  };

  return (
    <Stack
      sx={{
        p: 2,
        mt: { xs: 4, sm: 4, md: 8, lg: 8, xl: 8 },
        flexGrow: 1,
        position: 'relative',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <FormControl sx={{ alignItems: 'center', my: 4 }}>
        <RadioGroup
          row
          value={appType}
          name="app-type-radio-group"
          onChange={(e) => {
            setAppType(e.target.value as typeof appType);
          }}
        >
          <FormControlLabel
            value="A"
            control={<Radio size="medium" />}
            label={
              <Stack direction={'row'} alignItems={'center'}>
                <AdbIcon fontSize="large" sx={{ color: '#7CB342', mr: '0.1rem' }} />
                <Typography variant="body2">안드로이드 APK</Typography>
              </Stack>
            }
          />
          <FormControlLabel
            value="P"
            control={<Radio size="medium" />}
            label={
              <Stack direction={'row'} alignItems={'center'}>
                <DesktopWindowsIcon fontSize="large" sx={{ color: '#1D2951', mr: '0.1rem' }} />
                <Typography variant="body2">데스크탑 APP</Typography>
              </Stack>
            }
          />
        </RadioGroup>
      </FormControl>

      <Stepper alternativeLabel connector={<ColorlibConnector />} activeStep={activeStep} sx={{ my: 1.5 }}>
        {APP_DEPLOY_STEPS.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {alertData && (
        <Alert severity={alertData.color} color={alertData.color} sx={{ mt: 4, mx: 'auto', minWidth: '55%' }}>
          {alertData.message}
        </Alert>
      )}

      <Stack
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
        sx={{ position: 'relative', my: 2 }}
      >
        <Stack
          onClick={handleClickUploadBtn}
          direction={'column'}
          spacing={3}
          sx={{
            cursor: 'pointer',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '1rem',
            position: 'relative',
            minWidth: { xs: '90%', sm: '60%', md: '60%', lg: '60%', xl: '60%' },
            height: '280px',
            px: 1,
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          }}
        >
          <Image src={apkIcon} width={'48'} height={'48'} alt="apk-image" />
          <Typography
            variant="body2"
            color="grey.700"
            sx={{
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {appFile ? appFile.name : '배포할 애플리케이션을 올려주세요'}
          </Typography>
          {isDeploying && (
            <Box
              sx={{
                position: 'fixed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '60%',
                height: '280px',
                bgcolor: 'rgba(255,255,255,0.5)',
              }}
            >
              <PulseLoader color={'#36D7B7'} />
            </Box>
          )}
        </Stack>
        {appFile && (
          <Button variant="contained" onClick={deploy} disabled={isDeploying || deploySuccess}>
            <CloudUploadIcon sx={{ mr: '0.3rem' }} />
            <Typography variant="body1">{deploySuccess ? '배포완료' : '배포하기'}</Typography>
          </Button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".apk, .exe"
          onChange={handleFileChange}
        />
      </Stack>
    </Stack>
  );
};

export default AppDeployBox;
