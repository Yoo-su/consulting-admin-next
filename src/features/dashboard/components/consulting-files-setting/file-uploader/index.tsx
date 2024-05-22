'use client';

import { DragEvent, ChangeEvent, useState } from 'react';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { styled } from '@mui/material/styles';
import { useConsultingFileSettings } from '@/features/dashboard/hooks/use-consulting-file-settings';
import toast from 'react-hot-toast';
import { CustomWidthBoxCell } from '../table-components/table-boxes';

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
      console.log('items:', items);
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file' && items[i].type !== '') {
          const file = items[i].getAsFile();
          if (file) {
            addToFiles(file);
          }
          console.log(`items file[${i}].name = ${file?.name}`);
        } else {
          toast.error('개별 파일만 업로드 가능합니다.');
        }
      }
    }
  };
  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    addToFiles(file);
  };

  /* styled components */
  const UploadDivWrapper = styled('div')({
    width: '100%',
    textAlign: 'center',
    backgroundColor: fileEnter ? '#E5F6FD' : 'white',
  });

  const HiddenFileInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  return (
    <CustomWidthBoxCell justifyContent="center">
      <UploadDivWrapper
        onDragOver={handleDragEvent}
        onDragLeave={handleDragEvent}
        onDragEnd={handleDragEvent}
        onDrop={handleDropEvent}
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
