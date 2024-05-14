'use client';

import { useRef, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AttachFileIcon from '@mui/icons-material/AttachFile';

import { useStepper } from '@/shared/hooks/use-stepper';
import ColorlibStepIcon from '@/shared/components/stepper/color-lib-step-icon';
import { ColorlibConnector } from '@/shared/components/stepper/styled';
import { APP_DEPLOY_STEPS } from '@/features/dashboard/constants/app-deploy-steps';

const AppDeployer = () => {
  const { activeStep, skipped, handleNext, handleBack, handleSkip, handleReset } = useStepper();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 배포 버튼 클릭 처리
  const handleClickUploadBtn = () => {
    fileInputRef?.current?.click();
  };

  return (
    <Stack
      sx={{
        p: 6,
        flexGrow: 1,
        mt: 5,
        position: 'relative',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }}
    >
      <Stepper alternativeLabel connector={<ColorlibConnector />} activeStep={activeStep} sx={{ my: 1.5 }}>
        {APP_DEPLOY_STEPS.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Stack
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
        sx={{ position: 'relative', mt: 4 }}
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
            width: '320px',
            height: '220px',
            px: 1,
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          }}
        >
          <AttachFileIcon fontSize="large" />
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
            배포할 애플리케이션을 올려주세요
          </Typography>
        </Stack>

        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".apk" />
      </Stack>
    </Stack>
  );
};

export default AppDeployer;
