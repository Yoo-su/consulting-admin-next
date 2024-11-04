import { DragEvent } from 'react';
import { toast } from 'react-hot-toast';
import { Typography } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { useHandleBrowser } from './use-handle-browser';
import { useFileDropZone } from './use-file-drop-zone';

type UseHandleBrowserQueueProps = {
  isDropZone: boolean;
  appendDirectory: boolean;
  formData: FormData;
  uploadMutation: UseMutationResult<AxiosResponse<any, any>, Error, FormData, unknown>;
};
export const useHandleBrowserQueue = ({
  isDropZone,
  appendDirectory,
  formData,
  uploadMutation,
}: UseHandleBrowserQueueProps) => {
  const { uploadDirectory, invalidateCurrentPathQuery } = useHandleBrowser();
  const {
    queueFiles,
    handleAddFiles,
    handleResetFiles,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleRemoveFile,
  } = useFileDropZone({
    onDrop: (event: DragEvent<HTMLDivElement>) => {
      handleOnDrop(event);
    },
  });

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!isDropZone) {
      toast.error(<Typography variant={'caption'}>{'드롭 허용 영역이 아닙니다.'}</Typography>);
      return;
    }
    const arrayFiles = Array.from(event.dataTransfer.files);
    if (!arrayFiles.length) return;
    else handleAddFiles(arrayFiles);
  };

  const handleClear = () => {
    formData?.delete('files');
    handleResetFiles();
    invalidateCurrentPathQuery();
  };

  const handleUploadQueue = async () => {
    if (appendDirectory) formData?.set('Directory', uploadDirectory);
    queueFiles.forEach((file) => {
      formData?.append('files', file);
    });
    await toast
      .promise(uploadMutation!.mutateAsync(formData!), {
        loading: <Typography variant={'caption'}>업로드 중입니다...</Typography>,
        success: <Typography variant={'caption'}>성공적으로 업로드되었습니다.</Typography>,
        error: <Typography variant={'caption'}>업로드 중 에러가 발생했습니다.</Typography>,
      })
      .finally(() => {
        handleClear();
      });
  };

  return {
    queueFiles,
    handleUploadQueue,
    handleAddFiles,
    handleOnDrop,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleRemoveFile,
  };
};
