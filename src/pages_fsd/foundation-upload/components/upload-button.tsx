import { Check as CheckIcon, Upload as UploadIcon } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { memo, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useSharedStore } from '@/shared/models';

import { useFoundationUploadMutation } from '../hooks';
import { useFoundationStore, useOptionStore, useUiStore } from '../models';

export const UploadButton = memo(() => {
  const currentService = useSharedStore((state) => state.currentService);
  const { file, formData } = useFoundationStore(
    useShallow((state) => ({ formData: state.formData, file: state.file }))
  );
  const isFileOnly = useOptionStore((state) => state.isFileOnly);
  const isDataChecked = useUiStore((state) => state.isDataChecked);
  const { isUploading, isSuccess, postFoundation, resetBasic, resetFileOnly } = useFoundationUploadMutation();

  const buttonText = useMemo(() => {
    if (isUploading) return '엑셀 업로드중..';
    if (isSuccess) return '업로드 완료';
    return '엑셀 업로드';
  }, [isUploading, isSuccess]);

  // service 변경 시 mutation 리셋
  useEffect(() => {
    resetBasic();
    resetFileOnly();
  }, [currentService, file, isFileOnly]);

  if (!isDataChecked) return null;
  return (
    <Button
      color="success"
      variant="contained"
      onClick={() => postFoundation(formData)}
      disabled={isSuccess || isUploading}
    >
      {isSuccess ? <CheckIcon /> : <UploadIcon />}
      <Typography variant="body1">{buttonText}</Typography>
    </Button>
  );
});
UploadButton.displayName = 'UploadButton';
