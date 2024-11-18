import { Typography } from '@mui/material';
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ChangeEvent, DragEvent, useCallback, useMemo, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';

import { QUERY_KEYS } from '@/shared/constants';
import { useBrowserStore, useQueueStore } from '@/shared/models/stores';

type UseHandleQueueProps = {
  isDropZone: boolean;
  appendDirectory: boolean;
  formData: FormData;
  uploadMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    FormData,
    unknown
  >;
};
export const useHandleQueue = ({
  isDropZone,
  appendDirectory,
  formData,
  uploadMutation,
}: UseHandleQueueProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { basePath, currentPath } = useBrowserStore(
    useShallow((state) => ({
      basePath: state.basePath,
      currentPath: state.currentPath,
    }))
  );
  const { addBrowserQueueFiles, resetBrowserQueue } = useQueueStore(
    useShallow((state) => ({
      addBrowserQueueFiles: state.addBrowserQueueFiles,
      resetBrowserQueue: state.resetBrowserQueue,
    }))
  );

  // formData에 directory키에 대한 값을 넘겨줄 경우 그 값
  const uploadDirectory = useMemo(() => {
    if (basePath === currentPath) return '';
    return currentPath.slice(basePath.length + 1);
  }, [basePath, currentPath]);

  const handleOnDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    if (!isDropZone) {
      toast.error(
        <Typography variant={'caption'}>
          {'드롭 허용 영역이 아닙니다.'}
        </Typography>
      );
      return;
    }
    const arrayFiles = Array.from(event.dataTransfer.files);
    if (!arrayFiles.length) return;
    else addBrowserQueueFiles(arrayFiles);
  }, []);

  // file input 값 변경 처리
  const handleChangeFileInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      addBrowserQueueFiles(
        event.target.files ? Array.from(event.target.files) : []
      );
      event.target.value = '';
    },
    []
  );

  const handleClickInput = useCallback(() => {
    fileInputRef?.current?.click();
  }, [fileInputRef]);

  const handleRemoveInputFile = useCallback((fileName: string) => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const dataTransfer = new DataTransfer();

      Array.from(fileInputRef.current.files).forEach((file) => {
        if (file.name !== fileName) dataTransfer.items.add(file);
      });
      fileInputRef.current.files = dataTransfer.files;
    }
  }, []);

  const handleUploadBrowserQueue = useCallback(
    async (queue: File[]) => {
      if (appendDirectory) formData?.set('Directory', uploadDirectory);
      queue.forEach((file) => {
        formData?.append('files', file);
      });
      await toast
        .promise(uploadMutation!.mutateAsync(formData!), {
          loading: (
            <Typography variant={'caption'}>업로드 중입니다...</Typography>
          ),
          success: (
            <Typography variant={'caption'}>
              성공적으로 업로드되었습니다.
            </Typography>
          ),
          error: (
            <Typography variant={'caption'}>
              업로드 중 에러가 발생했습니다.
            </Typography>
          ),
        })
        .finally(() => {
          formData?.delete('files');
          resetBrowserQueue();
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
          });
        });
    },
    [uploadDirectory, currentPath]
  );

  // dialog queue 업로드 메서드
  const handleUploadDialogQueue = useCallback(
    async (queue: File[], directory: string) => {
      const refinedDirectory = uploadDirectory
        ? uploadDirectory + '/'
        : uploadDirectory;
      formData?.set('Directory', refinedDirectory + directory);
      queue.forEach((file) => {
        formData?.append('files', file);
      });
      await toast
        .promise(uploadMutation!.mutateAsync(formData!), {
          loading: (
            <Typography variant={'caption'}>업로드 중입니다...</Typography>
          ),
          success: (
            <Typography variant={'caption'}>
              성공적으로 업로드되었습니다.
            </Typography>
          ),
          error: (
            <Typography variant={'caption'}>
              업로드 중 에러가 발생했습니다.
            </Typography>
          ),
        })
        .finally(() => {
          formData?.delete('files');
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
          });
        });
    },
    [uploadDirectory, currentPath]
  );

  return {
    fileInputRef,
    handleClickInput,
    handleChangeFileInput,
    handleUploadBrowserQueue,
    handleUploadDialogQueue,
    handleOnDrop,
    handleRemoveInputFile,
  };
};
