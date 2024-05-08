'use client';

import { useRef, useState, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-hot-toast';

import CheckIcon from '@mui/icons-material/Check';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { useStepper } from '@/shared/hooks/use-stepper';
import ColorlibStepIcon from './stepper/color-lib-step-icon';
import { ColorlibConnector } from './stepper/styled';
import { useHandleExcel } from '@/features/dashboard/hooks/use-handle-excel';
import { EXCEL_UPLOAD_STEPS } from '@/features/dashboard/constants/excel-upload-steps';

const ExcelUploader = () => {
  const { excel, setExcel, isVerifying, readExcel } = useHandleExcel();
  const { activeStep, skipped, handleNext, handleBack, handleSkip, handleReset } = useStepper();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [helperText, setHelperText] = useState<string>('');

  const handleClickUploadBtn = () => {
    if (!isVerifying) fileInputRef?.current?.click();
  };

  const handleClickVerify = () => {
    try {
      readExcel();
    } catch (error) {
      setHelperText(error?.message ?? '에러가 발생했습니다');
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setExcel(selectedFile);
    if (activeStep === 0) handleNext();
  };

  return (
    <Card
      sx={{
        p: 2,
        flexGrow: 1,
        mt: 2,
        position: 'relative',
      }}
    >
      <Stepper alternativeLabel connector={<ColorlibConnector />} activeStep={activeStep} sx={{ my: 3 }}>
        {EXCEL_UPLOAD_STEPS.map((label, index) => (
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
        sx={{ position: 'relative' }}
      >
        <Stack
          onClick={handleClickUploadBtn}
          direction={'column'}
          spacing={3}
          sx={{
            ...(!isVerifying && { cursor: 'pointer' }),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '1rem',
            position: 'relative',
            width: '320px',
            height: '220px',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          }}
        >
          {isVerifying && (
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(255,255,255,0.5)',
              }}
            >
              <PulseLoader color={'#36D7B7'} />
            </Box>
          )}
          <AttachFileIcon fontSize="large" />
          <Typography variant="body2">{excel?.name ?? '기초데이터 엑셀을 올려주세요'}</Typography>
        </Stack>
        {activeStep === 1 && (
          <Button variant="contained" onClick={handleClickVerify} disabled={isVerifying}>
            <CheckIcon />
            <Typography variant="body1">{isVerifying ? '엑셀 검증중 ..' : '데이터 검증하기'}</Typography>
          </Button>
        )}
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInputChange} />
      </Stack>
    </Card>
  );
};

export default ExcelUploader;
