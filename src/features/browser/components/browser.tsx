'use client';

import { Grid, styled, SxProps } from '@mui/material';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { DropZoneContainer, SaveDataButton } from '@/shared/components';

import { DEFAULT_BROWSER_OPTION } from '../constants';
import { useHandleQueue } from '../hooks';
import { BrowserOptionOptional, useBrowserStore } from '../models';
import { AddDirectoryDialog } from './add-directory-dialog';
import { Content } from './content';
import { BrowserHeader } from './header';
import { Queue } from './queue';

type BrowserProps = {
  initialPath: string;
  browserOption?: BrowserOptionOptional;
  formData?: FormData;
  uploadMutation?: any;
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
    <DropZoneContainer onDrop={handleOnDrop} sx={BrowserContainerStyles}>
      <BrowserHeader handleClickInput={handleClickInput} />

      <FileGrid container rowSpacing={2}>
        <Content />
        <Queue handleRemoveInputFile={handleRemoveInputFile} />
      </FileGrid>

      {!!browserQueueLen && (
        <SaveDataButton
          label={`${browserQueueLen}개의 파일 업로드`}
          handleBtnClick={handleUploadBrowserQueue}
        />
      )}
      <AddDirectoryDialog handleUploadDialogQueue={handleUploadDialogQueue} />
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
