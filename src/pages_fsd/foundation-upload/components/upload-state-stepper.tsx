import { Step, StepLabel, Stepper } from '@mui/material';
import { memo, useMemo } from 'react';

import { ColorlibConnector, ColorlibStepIcon } from '@/shared/components';

import { EXCEL_UPLOAD_STEPS } from '../constants';
import { useFoundationUploadMutation } from '../hooks';
import { useFoundationStore, useUiStore } from '../models';

export const UploadStateStepper = memo(() => {
  const file = useFoundationStore((state) => state.file);
  const isDataChecked = useUiStore((state) => state.isDataChecked);
  const { isSuccess } = useFoundationUploadMutation();

  /**
   * 0단계 - 파일이 아직 등록되지 않은 단계
   * 1단계 - 파일 등록 후 데이터 검증은 진행되지 않은 단계
   * 2단계 - 데이터까지 검증된 후 업로드 대기단계
   * 3단계 - 업로드 완료 단계
   */
  const currentStep = useMemo(() => {
    if (!file) return 0;
    else if (file && !isDataChecked) return 1;
    else if (isDataChecked && !isSuccess) return 2;
    return 3;
  }, [file, isDataChecked, isSuccess]);

  return (
    <Stepper
      alternativeLabel
      connector={<ColorlibConnector />}
      activeStep={currentStep}
      sx={{ mt: { xs: 4, sm: 4, md: 8, lg: 8, xl: 8 }, mb: 1.5 }}
    >
      {EXCEL_UPLOAD_STEPS.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
});
UploadStateStepper.displayName = 'UploadStateStepper';
