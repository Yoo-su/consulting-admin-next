'use client';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { ChangeEvent, useRef, useState } from 'react';

import { useConsultingFileSettings, useFileDropHandler } from '@/pages_fsd/consulting-file-setting/hooks';
import { checkFileType, getFileTypeErrorToastComponent } from '@/pages_fsd/consulting-file-setting/services';
import { useTypographyToast } from '@/shared/hooks';

import { CellBoxCustomWidth } from '../table-customs';
import { HiddenFileInput } from './hidden-file-input.styled';
import { UploadDivWrapper } from './upload-div-wrapper.styled';

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
    <CellBoxCustomWidth justifyContent="center">
      <UploadDivWrapper {...dragHandlers} style={{ backgroundColor: fileEnter ? '#E5F6FD' : 'white' }}>
        <Button component="label" role={undefined} tabIndex={-1} sx={{ width: '100%' }} startIcon={<CloudUploadIcon />}>
          자료 업로드
          <HiddenFileInput type="file" onChange={handleChangeEvent} ref={fileInputRef} webkitdirectory="" />
        </Button>
      </UploadDivWrapper>
    </CellBoxCustomWidth>
  );
};
