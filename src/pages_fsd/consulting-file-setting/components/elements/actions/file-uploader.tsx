'use client';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { ChangeEvent, useRef, useState } from 'react';

import { useTypographyToast } from '@/shared/hooks';

import { useConsultingFileSettings, useFileDropHandler } from '../../../hooks';
import { checkFileType, getFileTypeErrorToastComponent } from '../../../services';
import { CustomWidthBoxCell, HiddenFileInput, UploadDivWrapper } from '../cells/';

export const FileUploader = () => {
  const { showError } = useTypographyToast();
  const { addToFiles } = useConsultingFileSettings();
  const [fileEnter, setFileEnter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragHandlers = useFileDropHandler({
    addToFiles,
    setFileEnter,
    fileInputRef,
  });

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (checkFileType(file)) {
      addToFiles(file);
    } else {
      const component = getFileTypeErrorToastComponent(file.name);
      showError(component);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <CustomWidthBoxCell justifyContent="center">
      <UploadDivWrapper {...dragHandlers} sx={{ backgroundColor: fileEnter ? '#E5F6FD' : 'white' }}>
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          sx={{
            width: '100%',
          }}
          startIcon={<CloudUploadIcon />}
        >
          자료 업로드
          <HiddenFileInput type="file" onChange={handleChangeEvent} ref={fileInputRef} webkitdirectory="" />
        </Button>
      </UploadDivWrapper>
    </CustomWidthBoxCell>
  );
};
