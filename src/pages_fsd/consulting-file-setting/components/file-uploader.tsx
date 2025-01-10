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
import { Stack } from '@mui/material';

export const FileUploader = () => {
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
    const processFileSystemEntries = async (items: DataTransferItemList) => {
      const processEntry = async (entry: FileSystemEntry): Promise<void> => {
        if (!entry) return;
        if (entry.isFile) {
          return new Promise<void>((resolve) => {
            (entry as FileSystemFileEntry).file((file) => {
              if (checkFileType(file)) {
                addToFiles(file);
              } else {
                toast.error(
                  <Stack direction="column">
                    <Typography variant="body2">
                      pdf/image 파일만 업로드 가능합니다
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ backgroundColor: '#fafbeb' }}
                    >
                      {file.name}
                    </Typography>
                  </Stack>
                );
              }
              resolve();
            });
          });
        }

        if (entry.isDirectory) {
          const reader = (entry as FileSystemDirectoryEntry).createReader();
          const entries = await new Promise<FileSystemEntry[]>((resolve) => {
            reader.readEntries(resolve);
          });

          await Promise.all(entries.map(processEntry));
        }
      };

      try {
        const entries = Array.from(items)
          .map((item) => item.webkitGetAsEntry())
          .filter((entry): entry is FileSystemEntry => entry !== null);

        await Promise.all(entries.map(processEntry));
      } catch (error) {
        console.error('Error processing files:', error);
        toast.error(
          <Typography variant="body2">
            파일 처리 중 오류가 발생했습니다
          </Typography>
        );
      }
    };

    if (items) {
      processFileSystemEntries(items);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (checkFileType(file)) {
      addToFiles(file);
    } else {
      toast.error(
        <Typography variant="body2">
          pdf/image 파일만 업로드 가능합니다
        </Typography>
      );
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
            webkitdirectory=""
          />
        </Button>
      </UploadDivWrapper>
    </CustomWidthBoxCell>
  );
};

const checkFileType = (file: File | null): boolean =>
  Boolean(
    file && (file.type === 'application/pdf' || file.type.startsWith('image/'))
  );
