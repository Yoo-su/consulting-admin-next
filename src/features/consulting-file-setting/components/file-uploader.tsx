'use client';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useConsultingFileSettings } from '../hooks';
import {
  CustomWidthBoxCell,
  HiddenFileInput,
  UploadDivWrapper,
} from './table-components';

const FileUploader = () => {
  const { addToFiles } = useConsultingFileSettings();
  const [fileEnter, setFileEnter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* event handlers */
  const handleDragEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFileEnter(event.type == 'dragover');
  };

  const handleDropEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFileEnter(false);
    const items = event.dataTransfer.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (
          items[i].kind === 'file' &&
          (items[i].type === 'application/pdf' ||
            items[i].type.includes('image'))
        ) {
          const file = items[i].getAsFile();
          if (file) {
            addToFiles(file);
          }
        } else {
          toast.error(
            <Typography variant="body2">
              pdf 파일만 업로드 가능합니다
            </Typography>
          );
        }
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type === 'application/pdf' || file.type.includes('image')) {
      addToFiles(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /* styled components */

  return (
    <CustomWidthBoxCell justifyContent="center">
      <UploadDivWrapper
        onDragOver={handleDragEvent}
        onDragLeave={handleDragEvent}
        onDragEnd={handleDragEvent}
        onDrop={handleDropEvent}
        sx={{
          backgroundColor: fileEnter ? '#E5F6FD' : 'white',
        }}
      >
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
          <HiddenFileInput
            type="file"
            onChange={handleChangeEvent}
            ref={fileInputRef}
          />
        </Button>
      </UploadDivWrapper>
    </CustomWidthBoxCell>
  );
};

export default FileUploader;
