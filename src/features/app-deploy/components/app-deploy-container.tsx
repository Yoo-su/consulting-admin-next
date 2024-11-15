'use client';

import AdbIcon from '@mui/icons-material/Adb';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import apkIcon from '@/shared/assets/images/apk_64.png';
import exeIcon from '@/shared/assets/images/exe_64.png';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import ColorlibStepIcon from '@/shared/components/ui/stepper/color-lib-step-icon';
import { ColorlibConnector } from '@/shared/components/ui/stepper/styled';
import { useUnivService } from '@/shared/hooks/context/use-univ-service';

import { APP_DEPLOY_STEPS } from '../constants';
import { useHandleApp } from '../hooks';

const AppDeployContainer = () => {
  const { currentUniv, currentService } = useUnivService();
  const {
    appType,
    setAppType,
    activeStep,
    appFile,
    setAppFile,
    alertData,
    deploy,
    isDeploying,
    deploySuccess,
  } = useHandleApp();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const title = `${currentUniv?.univName}(${currentService?.serviceID}) 앱 배포`;

  // 배포 버튼 클릭 처리
  const handleClickUploadBtn = () => {
    if (isDeploying) return;
    fileInputRef?.current?.click();
  };

  // 앱 유형 변경 처리
  const handleAppTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAppType(event.target.value as typeof appType);
  };

  // 파일 변경처리
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setAppFile(selectedFile);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setAppFile(droppedFile);
    }
  };

  useEffect(() => {
    setAppFile(null);
  }, [currentService]);

  return (
    <ContentWrapper>
      <ContentWrapper.Header bottomDivider>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant="h6" textAlign={'left'} flexGrow={1}>
            {title}
          </Typography>
        </Stack>
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        <FormControl sx={{ alignItems: 'center', my: 4, width: '100%' }}>
          <RadioGroup
            row
            value={appType}
            name="app-type-radio-group"
            onChange={handleAppTypeChange}
          >
            <FormControlLabel
              value="A"
              control={<Radio size="medium" />}
              label={
                <Stack direction={'row'} alignItems={'center'}>
                  <AdbIcon
                    fontSize="large"
                    sx={{ color: '#7CB342', mr: '0.1rem' }}
                  />
                  <Typography variant="body2">안드로이드 APK</Typography>
                </Stack>
              }
            />
            <FormControlLabel
              value="P"
              control={<Radio size="medium" />}
              label={
                <Stack direction={'row'} alignItems={'center'}>
                  <DesktopWindowsIcon
                    fontSize="large"
                    sx={{ color: '#1D2951', mr: '0.1rem' }}
                  />
                  <Typography variant="body2">데스크탑 APP</Typography>
                </Stack>
              }
            />
          </RadioGroup>
        </FormControl>
        <Stepper
          alternativeLabel
          connector={<ColorlibConnector />}
          activeStep={activeStep}
          sx={{ my: 1.5, width: '100%' }}
        >
          {APP_DEPLOY_STEPS.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {alertData && (
          <Alert
            severity={alertData.color}
            color={alertData.color}
            sx={{ mt: 4, mx: 'auto', width: '55%' }}
          >
            {alertData.message}
          </Alert>
        )}

        <Stack
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          spacing={2}
          sx={{ position: 'relative', my: 2, width: '100%' }}
        >
          <Stack
            onClick={handleClickUploadBtn}
            direction={'column'}
            spacing={3}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              cursor: 'pointer',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '1rem',
              position: 'relative',
              minWidth: {
                xs: '90%',
                sm: '60%',
                md: '60%',
                lg: '60%',
                xl: '60%',
              },
              height: '280px',
              px: 1,
              boxShadow:
                '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            }}
          >
            <Image
              src={appType === 'A' ? apkIcon : exeIcon}
              width={'48'}
              height={'48'}
              alt="apk-image"
            />
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
                  position: 'absolute',
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
            <Button
              variant="contained"
              onClick={() => {
                deploy(currentService?.serviceID ?? '');
              }}
              disabled={isDeploying || deploySuccess}
            >
              <CloudUploadIcon sx={{ mr: '0.3rem' }} />
              <Typography variant="body1">
                {deploySuccess ? '배포완료' : '배포하기'}
              </Typography>
            </Button>
          )}

          <input
            type="file"
            key={appFile?.name ?? '' + appFile?.lastModified ?? ''}
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept={appType === 'A' ? '.apk' : '.exe'}
            onChange={handleFileChange}
          />
        </Stack>
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default AppDeployContainer;
