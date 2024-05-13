'use client';

import { useRef, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import PulseLoader from 'react-spinners/PulseLoader';

import CheckIcon from '@mui/icons-material/Check';
import UploadIcon from '@mui/icons-material/Upload';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { useStepper } from '@/shared/hooks/use-stepper';
import ColorlibStepIcon from './stepper/color-lib-step-icon';
import { ColorlibConnector } from './stepper/styled';
import { useHandleExcel } from '@/features/dashboard/hooks/use-handle-excel';
import { EXCEL_UPLOAD_STEPS } from '@/features/dashboard/constants/excel-upload-steps';

const ExcelUploader = () => {
  const { excel, setExcel, startVerify, isVerified, helperText, upload, isUploaded, isUploading, clearVerifiedState } =
    useHandleExcel();
  const { activeStep, skipped, handleNext, handleBack, handleSkip, handleReset } = useStepper();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 업로드 버튼 클릭 처리
  const handleClickUploadBtn = () => {
    fileInputRef?.current?.click();
  };

  // 데이터 검증 수행
  const handleClickVerify = async () => {
    const result = await startVerify();
    if (result) handleNext();
  };

  // file input 값 변경 처리
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearVerifiedState();
    const selectedFile = event.target.files?.[0] || null;
    setExcel(selectedFile);
    if (!selectedFile) {
      handleReset();
      return;
    }
    if (activeStep === 0) handleNext();
    if (activeStep === 2) handleBack();
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
        {EXCEL_UPLOAD_STEPS.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {helperText.text && (
        <Alert color={helperText.color} sx={{ mt: 4 }} icon={<InfoOutlinedIcon />}>
          {helperText.text}
        </Alert>
      )}

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
            {excel?.name ?? '기초데이터 엑셀을 올려주세요'}
          </Typography>
          {isUploading && (
            <Box
              sx={{
                position: 'fixed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '320px',
                height: '220px',
                bgcolor: 'rgba(255,255,255,0.5)',
              }}
            >
              <PulseLoader color={'#36D7B7'} />
            </Box>
          )}
        </Stack>
        {excel && !isVerified && (
          <Button variant="contained" onClick={handleClickVerify}>
            <CheckIcon />
            <Typography variant="body1">데이터 검증하기</Typography>
          </Button>
        )}

        {isVerified && (
          <Button color="success" variant="contained" onClick={upload} disabled={isUploaded || isUploading}>
            {isUploaded ? <CheckIcon /> : <UploadIcon />}
            <Typography variant="body1">
              {isUploading ? '엑셀 업로드중..' : isUploaded ? '업로드 완료' : '엑셀 업로드'}
            </Typography>
          </Button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </Stack>
    </Stack>
  );
};

export default ExcelUploader;
