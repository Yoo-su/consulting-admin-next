import { useEffect } from 'react';
import { Stack, Typography, Grid, Fab, styled } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { useHandleBrowser, useHandleBrowserQueue } from '@/shared/hooks';
import LoadingCover from '../loadings/loading-cover';
import BrowserHeader from './header';
import FileList from './file-list';
import Queue from './queue';

type BrowserProps = {
  initialPath: string;
  appendDirectory?: boolean;
  showCurrentPath?: boolean;
  isDropZone?: boolean;
  formData?: FormData;
  uploadMutation?: UseMutationResult<AxiosResponse<any, any>, Error, FormData, unknown>;
};

// 스타일 정의
const BrowserContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[50],
  borderRadius: '0.2rem',
  padding: theme.spacing(1),
}));

const FileGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2.5, 1.5),
  minHeight: '240px',
  maxHeight: '480px',
  overflowY: 'scroll',
  border: '1px solid rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
}));

const UploadButton = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3.75),
  right: theme.spacing(3.75),
}));

const Browser = ({
  initialPath,
  appendDirectory = false,
  showCurrentPath = false,
  isDropZone = false,
  formData,
  uploadMutation,
}: BrowserProps) => {
  const { currentPath, browsedList, isBrowsing, handleClickDirectory, initPath, handleRenameFile } = useHandleBrowser();

  const {
    queueFiles,
    handleUploadQueue,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleAddFiles,
    handleRemoveFile,
  } = useHandleBrowserQueue({
    isDropZone,
    appendDirectory,
    formData: formData!,
    uploadMutation: uploadMutation!,
  });

  useEffect(() => {
    initPath(initialPath);
  }, []);

  return (
    <BrowserContainer
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      direction="column"
      spacing={1.5}
    >
      <BrowserHeader showCurrentPath={showCurrentPath} isDropZone={isDropZone} handleAddFiles={handleAddFiles} />

      <FileGrid container rowSpacing={2}>
        {isBrowsing ? (
          <LoadingCover loadingMessage="자료를 불러오는 중입니다 . ." />
        ) : (
          <FileList
            currentPath={currentPath}
            browsedList={browsedList ?? []}
            handleClickDirectory={handleClickDirectory}
            handleRenameFile={handleRenameFile}
          />
        )}

        <Queue queueFiles={queueFiles} handleRemoveFile={handleRemoveFile} />
      </FileGrid>

      {queueFiles.length > 0 && (
        <UploadButton variant="extended" color="info" size="medium" onClick={handleUploadQueue}>
          <UploadIcon sx={{ mr: 1 }} />
          <Typography variant="body2">{`${queueFiles.length}개의 파일 업로드`}</Typography>
        </UploadButton>
      )}
    </BrowserContainer>
  );
};

export default Browser;
