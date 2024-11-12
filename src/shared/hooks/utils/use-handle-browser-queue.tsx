import { ChangeEvent, DragEvent, useCallback, useMemo, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';
import { Typography } from '@mui/material';
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { useBrowserStore, useQueueStore, QueueType } from '@/shared/models/stores';
import { QUERY_KEYS } from '@/shared/constants';

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
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { basePath, currentPath } = useBrowserStore(
    useShallow((state) => ({ basePath: state.basePath, currentPath: state.currentPath }))
  );
  const { addBrowserQueueFiles, resetQueue } = useQueueStore(
    useShallow((state) => ({
      addBrowserQueueFiles: state.addBrowserQueueFiles,
      resetQueue: state.resetQueue,
    }))
  );

  // formData에 directory키에 대한 값을 넘겨줄 경우 그 값
  const uploadDirectory = useMemo(() => {
    if (basePath === currentPath) return '';
    return currentPath.slice(basePath.length + 1);
  }, [basePath, currentPath]);

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!isDropZone) {
      toast.error(<Typography variant={'caption'}>{'드롭 허용 영역이 아닙니다.'}</Typography>);
      return;
    }
    const arrayFiles = Array.from(event.dataTransfer.files);
    if (!arrayFiles.length) return;
    else addBrowserQueueFiles(arrayFiles);
  };

  // file input 값 변경 처리
  const handleChangeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    addBrowserQueueFiles(event.target.files ? Array.from(event.target.files) : []);
    event.target.value = '';
  };

  const handleClickInput = useCallback(() => {
    fileInputRef?.current?.click();
  }, [fileInputRef]);

  const handleRemoveInputFile = (fileName: string) => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const dataTransfer = new DataTransfer();

      Array.from(fileInputRef.current.files).forEach((file) => {
        if (file.name !== fileName) dataTransfer.items.add(file);
      });
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleUploadQueue = useCallback(
    async (queue: File[], queueType: QueueType) => {
      if (appendDirectory) formData?.set('Directory', uploadDirectory);
      queue.forEach((file) => {
        formData?.append('files', file);
      });
      await toast
        .promise(uploadMutation!.mutateAsync(formData!), {
          loading: <Typography variant={'caption'}>업로드 중입니다...</Typography>,
          success: <Typography variant={'caption'}>성공적으로 업로드되었습니다.</Typography>,
          error: <Typography variant={'caption'}>업로드 중 에러가 발생했습니다.</Typography>,
        })
        .finally(() => {
          formData?.delete('files');
          resetQueue(queueType);
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.browser.items(currentPath).queryKey,
          });
        });
    },
    [uploadDirectory]
  );

  return {
    fileInputRef,
    handleClickInput,
    handleChangeFileInput,
    handleUploadQueue,
    handleOnDrop,
    handleRemoveInputFile,
  };
};
