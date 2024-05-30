'use client';

import { DragEvent, ChangeEvent, useState } from 'react';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useConsultingFileSettings } from '@/features/dashboard/hooks/context/use-consulting-file-settings';
import { CustomWidthBoxCell } from '../table-components/table-boxes';
import { HiddenFileInput, UploadDivWrapper } from '../table-components/styled-component';
import toast from 'react-hot-toast';

const FileUploader = () => {
  const { addToFiles } = useConsultingFileSettings();
  const [fileEnter, setFileEnter] = useState(false);

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
        if (items[i].kind === 'file' && items[i].type === 'application/pdf') {
          const file = items[i].getAsFile();
          if (file) {
            addToFiles(file);
          }
          console.log(`items file[${i}].name = ${file?.name}`);
        } else {
          toast.error('pdf 파일만 업로드 가능합니다.');
        }
      }
    }
  };
  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    addToFiles(file);
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
          <HiddenFileInput type="file" onChange={handleChangeEvent} />
        </Button>
      </UploadDivWrapper>
    </CustomWidthBoxCell>
  );
};

export default FileUploader;
