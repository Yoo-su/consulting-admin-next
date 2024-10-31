'use client';

import { DragEvent } from 'react';
import { Stack, Typography, Grid, Fab } from '@mui/material';
import { toast } from 'react-hot-toast';
import UploadIcon from '@mui/icons-material/Upload';
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import LoadingCover from '../loadings/loading-cover';
import BrowserHeader from './header';
import FileList from './file-list';
import Queue from './queue';
import { useHandleBrowser } from '@/shared/hooks/use-handle-browser';
import { useFileDropZone } from '@/shared/hooks/use-file-drop-zone';

type BrowserProps = {
  initialPath: string;
  uploadDirectory?: boolean;
  showCurrentPath?: boolean;
  isDropZone?: boolean;
  formData?: FormData;
  uploadMutation?: UseMutationResult<AxiosResponse<any, any>, Error, FormData, unknown>;
};
const Browser = ({
  initialPath,
  uploadDirectory = false,
  showCurrentPath = false,
  isDropZone = false,
  formData,
  uploadMutation,
}: BrowserProps) => {
  const {
    browsedList,
    displayingPath,
    currentPath,
    currentDirectory,
    isNotRoot,
    handleClickDirectory,
    handleClickPrevBtn,
    isBrowsing,
  } = useHandleBrowser(initialPath);
  const {
    queueFiles,
    handleDragEnter,
    handleAddFiles,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleRemoveFile,
    handleResetFiles,
  } = useFileDropZone({
    onDrop: (event: DragEvent<HTMLDivElement>) => {
      handleOnDrop(event);
    },
  });
  const queryClient = useQueryClient();

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!isDropZone) {
      toast.error(<Typography variant={'caption'}>{'드롭 허용 영역이 아닙니다.'}</Typography>);
      return;
    }
    const arrayFiles = Array.from(event.dataTransfer.files);
    if (!arrayFiles.length) return;
    else handleAddFiles(arrayFiles);
  };

  const handleMutationCallback = () => {
    formData?.delete('files');
    handleResetFiles();
    queryClient.invalidateQueries({
      queryKey: ['get-browser-list', currentPath],
    });
  };

  const handleUploadQueue = async () => {
    try {
      if (uploadDirectory) formData?.set('Directory', currentDirectory);
      formData?.delete('files');
      queueFiles.forEach((file) => {
        formData?.append('files', file);
      });

      await uploadMutation?.mutateAsync(formData!);
    } catch (error) {
      toast.error(<Typography variant={'caption'}>업로드 중 에러가 발생했습니다.</Typography>);
    } finally {
      handleMutationCallback();
    }
  };

  return (
    <Stack
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      direction={'column'}
      spacing={1.5}
      padding={1}
      sx={{ position: 'relative', bgcolor: 'grey.50', borderRadius: '0.2rem' }}
    >
      <BrowserHeader
        displayingPath={displayingPath}
        fileCount={browsedList?.length ?? 0}
        showCurrentPath={showCurrentPath}
        isNotRoot={isNotRoot}
        onClickPrev={handleClickPrevBtn}
      />

      <Grid
        container
        rowSpacing={2}
        sx={{
          position: 'relative',
          paddingX: 1.5,
          paddingY: 2.5,
          minHeight: '240px',
          maxHeight: '480px',
          overflowY: 'scroll',
          border: '1px solid rgba(0,0,0,0.1)',
          bgcolor: '#fff',
        }}
      >
        {isBrowsing ? (
          <LoadingCover loadingMessage={'자료를 불러오는 중입니다 . .'} />
        ) : (
          <FileList browsedList={browsedList ?? []} handleClickDirectory={handleClickDirectory} />
        )}

        <Queue queueFiles={queueFiles} handleRemoveFile={handleRemoveFile} />
      </Grid>
      {queueFiles.length > 0 && (
        <Fab
          variant={'extended'}
          color={'info'}
          size={'medium'}
          sx={{
            position: 'absolute',
            bottom: 30,
            right: 30,
          }}
          onClick={async () => {
            await handleUploadQueue();
          }}
        >
          <UploadIcon sx={{ mr: 1 }} />
          <Typography variant={'body2'}>{`${queueFiles.length}개의 파일 업로드`}</Typography>
        </Fab>
      )}
    </Stack>
  );
};

export default Browser;
