'use client';

import { useRef, ChangeEvent, Fragment } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import PulseLoader from 'react-spinners/PulseLoader';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CheckIcon from '@mui/icons-material/Check';
import UploadIcon from '@mui/icons-material/Upload';

import { useStepper } from '@/shared/hooks/use-stepper';
import ColorlibStepIcon from '@/shared/components/stepper/color-lib-step-icon';
import { ColorlibConnector } from '@/shared/components/stepper/styled';
import { useHandleExcel } from '@/features/dashboard/hooks/use-handle-excel';
import { EXCEL_UPLOAD_STEPS } from '@/features/dashboard/constants/excel-upload-steps';
import excelIcon from '@/shared/assets/images/xls_64.png';
import { useUnivService } from '../../hooks/use-univ-service';

const ExcelUploadBox = () => {
  const { currentUniv, currentService } = useUnivService();
  const title = `${currentUniv?.univName}(${currentService?.serviceID}) 기초데이터 업로드`;
  const {
    excel,
    setExcel,
    startVerify,
    isVerified,
    alertData,
    upload,
    uploadSuccess,
    isUploading,
    clearVerifiedState,
  } = useHandleExcel();
  const { activeStep, skipped, handleNext, handleBack, handleSkip, handleReset } = useStepper();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 업로드 버튼 클릭 처리
  const handleClickUploadBtn = () => {
    if (isUploading) return;
    fileInputRef?.current?.click();
  };

  // 데이터 검증 수행
  const handleClickVerify = async () => {
    const result = await startVerify();
    if (result) handleNext();
  };

  // file input 값 변경 처리
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <Fragment>
      <Stack
        direction={'row'}
        justifyContent={'flex-end'}
        sx={{ flexGrow: 1, mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 } }}
      >
        <Chip color="default" clickable icon={<ArrowCircleDownIcon />} label="기초 레이아웃 다운로드" />
      </Stack>
      <Stack
        sx={{
          p: 2,
          mt: 2,
          flexGrow: 1,
          position: 'relative',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
      >
        <Typography variant="h6">{title}</Typography>

        <Stepper
          alternativeLabel
          connector={<ColorlibConnector />}
          activeStep={activeStep}
          sx={{ mt: { xs: 4, sm: 4, md: 8, lg: 8, xl: 8 }, mb: 1.5 }}
        >
          {EXCEL_UPLOAD_STEPS.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {alertData && (
          <Alert severity={alertData.color} color={alertData.color} sx={{ mt: 4, mx: 'auto', minWidth: '65%' }}>
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
              minWidth: { xs: '90%', sm: '70%', md: '70%', lg: '70%', xl: '70%' },
              height: '280px',
              px: 1,
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            }}
          >
            <Image src={excelIcon} width={'48'} height={'48'} alt="excel-image" />
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
                  minWidth: '70%',
                  height: '280px',
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
            <Button color="success" variant="contained" onClick={upload} disabled={uploadSuccess || isUploading}>
              {uploadSuccess ? <CheckIcon /> : <UploadIcon />}
              <Typography variant="body1">
                {isUploading ? '엑셀 업로드중..' : uploadSuccess ? '업로드 완료' : '엑셀 업로드'}
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
    </Fragment>
  );
};

export default ExcelUploadBox;
