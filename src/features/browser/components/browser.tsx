'use client';

import { CSSProperties, useEffect } from 'react';

import { DropZoneContainer, SaveDataButton } from '@/shared/components';

import { DEFAULT_BROWSER_OPTION } from '../constants';
import { useHandleQueue } from '../hooks';
import { BrowserOptionOptional, UploadMutationType, useBrowserStore } from '../models';
import { AddDirectoryDialog } from './add-directory-dialog';
import { BrowserDisplayBoundary } from './display-boundary';
import { BrowserHeader } from './header';
import { ListRenderer } from './list-renderer';
import { QueueRenderer } from './queue-renderer';

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
    <div style={browserContainerStyles}>
      {/* browser header - 정렬 기준 설정, 현재경로 확인, 파일추가, 폴더추가, 이전페이지 이동 */}
      <BrowserHeader handleClickInput={handleClickInput} />

      {/* browser item(디렉토리, 파일), queue item 렌더링 담당 */}
      <DropZoneContainer onDrop={handleOnDrop}>
        <BrowserDisplayBoundary>
          <ListRenderer />
          <QueueRenderer handleRemoveInputFile={handleRemoveInputFile} />
        </BrowserDisplayBoundary>
      </DropZoneContainer>

      {!!browserQueueLen && (
        <SaveDataButton
          label={`${browserQueueLen}개의 파일 업로드`}
          disabled={uploadMutation?.isPending}
          handleBtnClick={handleUploadBrowserQueue}
        />
      )}
      <AddDirectoryDialog isUploading={uploadMutation?.isPending} handleUploadDialogQueue={handleUploadDialogQueue} />
      <input style={{ display: 'none' }} type={'file'} multiple ref={fileInputRef} onChange={handleChangeFileInput} />
    </div>
  );
};

const browserContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  backgroundColor: '#FAFAFA',
  borderRadius: '0.2rem',
  padding: '16px',
  gap: '12px',
};
