import { useEffect } from 'react';
import { Grid, styled, SxProps } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { useHandleBrowserQueue } from '@/shared/hooks';
import DropZoneContainer from '../drop-zone-container';
import LoadingCover from '../loadings/loading-cover';
import BrowserHeader from './header';
import FileList from './file-list';
import Queue from './queue';
import { useBrowserStore } from '@/shared/models/stores';
import { useGetBrowserListQuery } from '@/shared/hooks/tanstack';
import UploadButton from './atoms/upload-button';

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

type BrowserProps = {
  initialPath: string;
  appendDirectory?: boolean;
  showCurrentPath?: boolean;
  isDropZone?: boolean;
  formData?: FormData;
  uploadMutation?: UseMutationResult<AxiosResponse<any, any>, Error, FormData, unknown>;
};
const Browser = ({
  initialPath,
  appendDirectory = false,
  showCurrentPath = false,
  isDropZone = false,
  formData,
  uploadMutation,
}: BrowserProps) => {
  const initPath = useBrowserStore((state) => state.initPath);
  const currentPath = useBrowserStore((state) => state.currentPath);
  const { data: browserQueryData, isLoading: isBrowsing } = useGetBrowserListQuery(currentPath);
  const {
    fileInputRef,
    handleUploadQueue,
    handleOnDrop,
    handleChangeFileInput,
    handleClickInput,
    handleRemoveInputFile,
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
    <DropZoneContainer onDrop={handleOnDrop} sx={BrowserContainerStyles}>
      <BrowserHeader showCurrentPath={showCurrentPath} isDropZone={isDropZone} handleClickInput={handleClickInput} />

      <FileGrid container rowSpacing={2}>
        {isBrowsing ? (
          <LoadingCover loadingMessage="자료를 불러오는 중입니다 . ." />
        ) : (
          <FileList browsedList={browserQueryData?.items ?? []} />
        )}

        <Queue handleRemoveInputFile={handleRemoveInputFile} />
      </FileGrid>

      <UploadButton handleUploadQueue={handleUploadQueue} />

      <input style={{ display: 'none' }} type={'file'} multiple ref={fileInputRef} onChange={handleChangeFileInput} />
    </DropZoneContainer>
  );
};

export default Browser;
