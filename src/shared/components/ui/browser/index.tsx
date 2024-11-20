import { Grid, styled, SxProps } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { useHandleQueue } from '@/shared/hooks';
import { useHandleBrowserData } from '@/shared/hooks/utils/use-handle-browser-data';
import { useBrowserStore, useQueueStore } from '@/shared/models/stores';

import DropZoneContainer from '../drop-zone-container';
import LoadingCover from '../loadings/loading-cover';
import AddFolderDialog from './add-folder-dialog';
import UploadButton from './atoms/upload-button';
import BrowserHeader from './header';
import FileList from './molecules/file-list';
import Queue from './molecules/queue';

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

  const { displayingBrowserData, isBrowsing } =
    useHandleBrowserData(currentPath);
  const {
    fileInputRef,
    handleUploadBrowserQueue,
    handleUploadDialogQueue,
    handleOnDrop,
    handleChangeFileInput,
    handleClickInput,
    handleRemoveInputFile,
  } = useHandleQueue({
    isDropZone,
    appendDirectory,
    formData: formData!,
    uploadMutation: uploadMutation!,
  });

  const browserQueue = useQueueStore(useShallow((state) => state.browserQueue));

  const handleUploadQueue = useCallback(async () => {
    await handleUploadBrowserQueue(browserQueue);
  }, [handleUploadBrowserQueue, browserQueue]);

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
        {isBrowsing ? (
          <LoadingCover loadingMessage="자료를 불러오는 중입니다 . ." />
        ) : (
          <FileList browsedList={displayingBrowserData} />
        )}

        <Queue handleRemoveInputFile={handleRemoveInputFile} />
      </FileGrid>

      <UploadButton queue={browserQueue} handleQueue={handleUploadQueue} />

      <input
        style={{ display: 'none' }}
        type={'file'}
        multiple
        ref={fileInputRef}
        onChange={handleChangeFileInput}
      />

      <AddFolderDialog handleUploadDialogQueue={handleUploadDialogQueue} />
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
