import { Grid, styled, SxProps } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import DropZoneContainer from '@/shared/components/ui/drop-zone-container';
import LoadingCover from '@/shared/components/ui/loadings/loading-cover';

import { useHandleBrowserData } from '../hooks';
import { useHandleQueue } from '../hooks';
import { useBrowserStore, useQueueStore } from '../models';
import UploadButton from './atoms/upload-button';
import FileList from './molecules/file-list';
import BrowserHeader from './molecules/header';
import Queue from './molecules/queue';
import AddFolderDialog from './widgets/add-folder-dialog';

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
const Browser = ({
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
        <FileList currentPath={currentPath} />
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

export default Browser;
