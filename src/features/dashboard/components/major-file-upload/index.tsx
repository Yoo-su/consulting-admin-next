'use client';

import { ChangeEvent, useRef, useState, DragEvent } from 'react';
import ContentWrapper from '@/shared/components/content-wrapper';
import { FormControl, Stack, Typography, InputLabel, Input, InputAdornment, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useUnivService } from '../../hooks/context/use-univ-service';
import { useHandleMajorFile } from './hooks/use-handle-major-file';
import { useUploadMajorFileMutation } from './hooks/use-upload-major-file-mutation';
import PulseLoader from 'react-spinners/PulseLoader';
import FileItemCard, { FileType } from '@/shared/components/file-item-card';
import { useUser } from '@/features/auth/hooks/use-user';

const MajorFileUploadBox = () => {
  const { user } = useUser();
  const { currentUniv, currentService } = useUnivService();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { majorFile, handleMajorFileChange: setMajorFile, formData } = useHandleMajorFile();
  const { mutateAsync, isPending, isSuccess, reset } = useUploadMajorFileMutation();
  const [uploadDirectory, setUploadDirectory] = useState<string>(new Date().getFullYear().toString());

  const handleClickInputBox = () => {
    if (isPending) return;
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isSuccess) reset();
    const selectedFile = event.target.files?.[0] ?? null;
    setMajorFile(selectedFile);
  };

  const handleClickUploadBtn = async () => {
    formData.set('UserID', user?.sub ?? '');
    formData.set('UnivID', currentUniv?.univID ?? '');
    formData.set('Directory', uploadDirectory);
    await mutateAsync(formData);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setMajorFile(droppedFile);
    }
  };

  return (
    <ContentWrapper>
      <ContentWrapper.Header
        bottomDivider
        sxProps={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography
          variant="h6"
          textAlign={'left'}
        >{`${currentUniv?.univName}(${currentService?.serviceID}) 학과 자료 업로드`}</Typography>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">업로드 경로</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <FolderOpenIcon />
              </InputAdornment>
            }
            placeholder={uploadDirectory}
          />
        </FormControl>
      </ContentWrapper.Header>

      <ContentWrapper.MainContent>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={2} px={1}>
          <Stack
            width={'100%'}
            onClick={handleClickInputBox}
            direction={'column'}
            spacing={3}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              cursor: 'pointer',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '1rem',
              position: 'relative',
              minWidth: { xs: '90%', sm: '60%', md: '60%', lg: '60%', xl: '60%' },
              height: '380px',
              px: 1,
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            }}
          >
            <FileItemCard.IconBox file={majorFile ? (majorFile?.name.split('.')[1] as FileType) : 'none'} />
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
              {majorFile ? majorFile.name : '업로드할 학과자료를 올려주세요'}
            </Typography>
            {isPending && (
              <Box
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '60%',
                  height: '380px',
                  bgcolor: 'rgba(255,255,255,0.5)',
                }}
              >
                <PulseLoader color={'#36D7B7'} />
              </Box>
            )}
          </Stack>
          {majorFile && (
            <LoadingButton
              loading={isPending}
              variant={'contained'}
              color="success"
              startIcon={<CloudUploadIcon />}
              onClick={handleClickUploadBtn}
              disabled={isSuccess}
            >
              <Typography variant="body2">{isSuccess ? '업로드 완료' : '자료 업로드'}</Typography>
            </LoadingButton>
          )}
          <input
            type="file"
            key={majorFile?.name ?? '' + majorFile?.lastModified ?? ''}
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Stack>
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default MajorFileUploadBox;
