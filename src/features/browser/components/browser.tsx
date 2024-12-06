import { Grid, styled, SxProps } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { DropZoneContainer } from '@/shared/components';

import { useHandleQueue } from '../hooks';
import { useBrowserStore } from '../models';
import { UploadButton } from './atoms';
import { BrowserHeader, Queue } from './molecules';
import FileList from './molecules/file-list';
import { AddFolderDialog } from './widgets';

type BrowserProps = {
  initialPath: string;
  appendDirectory?: boolean;
  showCurrentPath?: boolean;
  isDropZone?: boolean;
  formData?: FormData;
  uploadMutation?: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    FormData,
    unknown
  >;
};
export const Browser = ({
  initialPath,
  appendDirectory = false,
  showCurrentPath = false,
  isDropZone = false,
  formData,
  uploadMutation,
}: BrowserProps) => {
  const { initPath, currentPath } = useBrowserStore(
    useShallow((state) => ({
      initPath: state.initPath,
      currentPath: state.currentPath,
    }))
  );
  const {
    browserQueueLen,
    fileInputRef,
    handleChangeFileInput,
    handleClickInput,
    handleUploadBrowserQueue,
    handleUploadDialogQueue,
    handleOnDrop,
    handleRemoveInputFile,
  } = useHandleQueue({
    isDropZone,
    appendDirectory,
    formData: formData!,
    uploadMutation: uploadMutation!,
  });

  useEffect(() => {
    initPath(initialPath);
  }, [initialPath]);

  return (
    <DropZoneContainer onDrop={handleOnDrop} sx={BrowserContainerStyles}>
      <BrowserHeader
        showCurrentPath={showCurrentPath}
        appendDirectory={appendDirectory}
        isDropZone={isDropZone}
        handleClickInput={handleClickInput}
      />

      <FileGrid container rowSpacing={2}>
        <FileList currentPath={currentPath} browserQueueLen={browserQueueLen} />
        <Queue handleRemoveInputFile={handleRemoveInputFile} />
      </FileGrid>

      <UploadButton
        queueLen={browserQueueLen}
        handleQueue={handleUploadBrowserQueue}
      />
      <AddFolderDialog handleUploadDialogQueue={handleUploadDialogQueue} />
      <input
        style={{ display: 'none' }}
        type={'file'}
        multiple
        ref={fileInputRef}
        onChange={handleChangeFileInput}
      />
    </DropZoneContainer>
  );
};

const BrowserContainerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  backgroundColor: 'grey.50',
  borderRadius: '0.2rem',
  padding: 2,
  gap: 3,
};

const FileGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2.5, 1.5),
  minHeight: '240px',
  maxHeight: '480px',
  overflowY: 'scroll',
  border: '1px solid rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
}));
