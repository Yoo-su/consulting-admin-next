'use client';

import { ChangeEvent, useRef, useState, DragEvent, Fragment } from 'react';
import ContentWrapper from '@/shared/components/content-wrapper';
import {
  FormControl,
  Stack,
  Typography,
  InputLabel,
  Input,
  InputAdornment,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { useUnivService } from '../../hooks/context/use-univ-service';
import { useHandleMajorFile } from './hooks/use-handle-major-file';
import { useUploadMajorFileMutation } from './hooks/use-upload-major-file-mutation';
import PulseLoader from 'react-spinners/PulseLoader';
import FileItemCard, { FileType } from '@/shared/components/file-item-card';
import { useUser } from '@/features/auth/hooks/use-user';
import EmptyBox from '@/shared/components/empty-box';

const MajorFileUploadBox = () => {
  const { user } = useUser();
  const { currentUniv, currentService } = useUnivService();
  const { majorFiles, handleMajorFileAdd: addMajorFile, formData, clearState } = useHandleMajorFile();
  const { mutateAsync, isPending, isSuccess, reset } = useUploadMajorFileMutation();
  const [uploadDirectory, setUploadDirectory] = useState<string>(new Date().getFullYear().toString());
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickInputBox = () => {
    if (isPending) return;
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
    if (selectedFiles.length) addMajorFile(selectedFiles);
  };

  const handleClickUploadBtn = async () => {
    formData.set('UserID', user?.sub ?? '');
    formData.set('UnivID', currentUniv?.univID ?? '');
    formData.set('Directory', uploadDirectory);
    await mutateAsync(formData);
  };

  const resetState = () => {
    clearState();
    reset();
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const arrayFiles = Array.from(event.dataTransfer.files);

    if (!arrayFiles.length) return;
    else addMajorFile(arrayFiles);
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
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
          {majorFiles.length ? (
            <Stack direction={'column'} alignItems={'flex-start'} width={'100%'} flexWrap={'wrap'}>
              <Typography variant="h6">
                {isSuccess
                  ? `${majorFiles.length}개의 자료가 업로드되었습니다`
                  : `${majorFiles.length}개의 자료가 대기중입니다..`}
              </Typography>
              <Grid
                container
                direction={'row'}
                alignItems={'flex-start'}
                sx={{
                  mt: 3,
                  borderRadius: '0.8rem',
                  p: 1,
                  minHeight: '200px',
                  maxHeight: '450px',
                  overflowY: 'scroll',
                  bgcolor: 'rgba(0,0,0,0.015)',
                  ...(isDragging && {
                    bgcolor: 'rgba(0,0,0,0.04)',
                  }),
                }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {majorFiles.map((fileItem) => {
                  const fileType = fileItem.name.split('.')[1] ?? 'none';
                  return (
                    <Grid
                      key={fileItem.name}
                      component={'div'}
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={3}
                      onDragOver={handleDragOver}
                    >
                      <FileItemCard
                        sxProps={{
                          bgcolor: '#fff',
                          ...(!isSuccess && {
                            animation: 'wiggle 2s infinite',
                          }),
                          m: 1,
                        }}
                      >
                        <FileItemCard.IconBox file={fileType as FileType} />
                        <FileItemCard.ContentBox>
                          <FileItemCard.TitleBox title={fileItem.name} />

                          <FileItemCard.AdditionalInfo sxProps={{ justifyContent: 'flex-end' }}>
                            <Typography variant="caption" color={'rgba(0,0,0,0.7)'}>
                              {fileItem.size} bytes
                            </Typography>
                          </FileItemCard.AdditionalInfo>
                        </FileItemCard.ContentBox>
                      </FileItemCard>
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
          ) : (
            <EmptyBox
              text={'업로드할 자료를 드래그하세요'}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          )}
          <Divider sx={{ width: '100%', my: 2, borderColor: 'rgba(0,0,0,0.08)' }} />
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
            {isSuccess ? (
              <Button variant="contained" color="inherit" startIcon={<RestartAltIcon />} onClick={resetState}>
                <Typography variant="body2">초기화</Typography>
              </Button>
            ) : (
              <Button variant="contained" color="info" startIcon={<AddCircleIcon />} onClick={handleClickInputBox}>
                <Typography variant="body2">업로드할 자료 추가</Typography>
              </Button>
            )}
            {!!majorFiles.length && (
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
          </Stack>
          <input type="file" ref={fileInputRef} multiple style={{ display: 'none' }} onChange={handleFileChange} />
        </Stack>
      </ContentWrapper.MainContent>
    </ContentWrapper>
  );
};

export default MajorFileUploadBox;
