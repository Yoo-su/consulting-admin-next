'use client';

import { SxProps } from '@mui/material';
import { useEffect } from 'react';

import { DropZoneContainer, SaveDataButton } from '@/shared/components';

import { DEFAULT_BROWSER_OPTION } from '../constants';
import { useHandleQueue } from '../hooks';
import {
  BrowserOptionOptional,
  UploadMutationType,
  useBrowserStore,
} from '../models';
import { AddDirectoryDialog } from './add-directory-dialog';
import { BrowserHeader } from './header';
import { ListRenderer } from './list-renderer';

type BrowserProps = {
  initialPath: string;
  browserOption?: BrowserOptionOptional;
  formData?: FormData;
  uploadMutation?: UploadMutationType;
};
export const Browser = ({
  initialPath,
  browserOption = DEFAULT_BROWSER_OPTION,
  formData,
  uploadMutation,
}: BrowserProps) => {
  const { initPath, setBrowserOption } = useBrowserStore();
  const {
    fileInputRef,
    browserQueueLen,
    handleChangeFileInput,
    handleClickInput,
    handleUploadBrowserQueue,
    handleUploadDialogQueue,
    handleOnDrop,
    handleRemoveInputFile,
  } = useHandleQueue({
    formData: formData!,
    uploadMutation: uploadMutation!,
  });

  useEffect(() => {
    initPath(initialPath);
    setBrowserOption({ ...DEFAULT_BROWSER_OPTION, ...browserOption });
  }, [initialPath]);

  return (
    <DropZoneContainer onDrop={handleOnDrop} sx={browserContainerStyles}>
      <BrowserHeader handleClickInput={handleClickInput} />

      <ListRenderer handleRemoveInputFile={handleRemoveInputFile} />

      {!!browserQueueLen && (
        <SaveDataButton
          label={`${browserQueueLen}개의 파일 업로드`}
          disabled={uploadMutation?.isPending}
          handleBtnClick={handleUploadBrowserQueue}
        />
      )}
      <AddDirectoryDialog
        isUploadPending={uploadMutation?.isPending}
        handleUploadDialogQueue={handleUploadDialogQueue}
      />
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

const browserContainerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  backgroundColor: 'grey.50',
  borderRadius: '0.2rem',
  padding: 2,
  gap: 3,
};
