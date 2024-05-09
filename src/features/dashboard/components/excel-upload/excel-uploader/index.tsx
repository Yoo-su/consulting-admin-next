'use client';

import { useRef, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
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
import { useUnivService } from '@/shared/hooks/use-univ-service';
import { useHandleExcel } from '@/features/dashboard/hooks/use-handle-excel';
import { EXCEL_UPLOAD_STEPS } from '@/features/dashboard/constants/excel-upload-steps';

const ExcelUploader = () => {
  const { currentService } = useUnivService();
  const { excel, setExcel, isVerifying, startVerify, isVerified, helperText, upload, isUploaded, clearVerifiedState } =
    useHandleExcel();
  const { activeStep, skipped, handleNext, handleBack, handleSkip, handleReset } = useStepper();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 업로드 버튼 클릭 처리
  const handleClickUploadBtn = () => {
    if (isVerifying) return;
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
    if (!excel) handleReset();
    if (activeStep === 0) handleNext();
    if (activeStep === 2) handleBack();
    const selectedFile = event.target.files?.[0] || null;
    setExcel(selectedFile);
  };

  if (!currentService)
    return (
      <Alert sx={{ mt: 5 }} color="info" icon={<InfoOutlinedIcon />}>
        서비스가 선택되지 않았습니다. 사이드바에서 서비스를 선택해주세요
      </Alert>
    );

  return (
    <Card
      sx={{
        p: 6,
        flexGrow: 1,
        mt: 5,
        position: 'relative',
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
        <Alert color={helperText.color} sx={{ my: 4 }} icon={<InfoOutlinedIcon />}>
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
            ...(!isVerifying && { cursor: 'pointer' }),
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
          {isVerifying && (
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
          <Button variant="contained" onClick={handleClickVerify} disabled={isVerifying}>
            <CheckIcon />
            <Typography variant="body1">{isVerifying ? '엑셀 검증중 ..' : '데이터 검증하기'}</Typography>
          </Button>
        )}

        {isVerified && (
          <Button color="success" variant="contained" onClick={upload} disabled={isUploaded}>
            {isUploaded ? <CheckIcon /> : <UploadIcon />}
            <Typography variant="body1">{isUploaded ? '업로드 성공' : '엑셀 업로드'}</Typography>
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
    </Card>
  );
};

export default ExcelUploader;
