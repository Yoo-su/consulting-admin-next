import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, DragEvent, useCallback, useEffect, useMemo, useRef } from 'react';

import { QUERY_KEYS } from '@/shared/constants';
import { useTypographyToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';
import { handleToastPromise } from '@/shared/services';

import { UploadMutationType, useBrowserStore, useQueueStore } from '../models';

type UseHandleQueueProps = {
  formData: FormData;
  uploadMutation: UploadMutationType;
};
type UseHandleQueueReturn = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  browserQueueLen: number;
  handleUploadBrowserQueue: () => Promise<void>;
  handleUploadDialogQueue: (directory: string) => Promise<void>;
  handleOnDrop: (event: DragEvent<HTMLDivElement>) => void;
  handleRemoveInputFile: (fileName: string) => void;
  handleChangeFileInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickInput: () => void;
};

/**
 * @description
 * 신규 파일 업로드와 관련한 값, 메서드를 관리하는 hook
 */
export const useHandleQueue = ({ formData, uploadMutation }: UseHandleQueueProps) => {
  const { showError } = useTypographyToast();
  const _return = useRef<UseHandleQueueReturn>();
  const queryClient = useQueryClient();
  const currentService = useSharedStore((state) => state.currentService);
  const { basePath, currentPath, browserOption } = useBrowserStore();
  const browserQueue = useQueueStore((state) => state.browserQueue);
  const dialogQueue = useQueueStore((state) => state.dialogQueue);
  const isAddDirectoryDialogOpen = useQueueStore((state) => state.isAddDirectoryDialogOpen);
  const addBrowserQueueFiles = useQueueStore((state) => state.addBrowserQueueFiles);
  const resetBrowserQueue = useQueueStore((state) => state.resetBrowserQueue);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // formData에 directory키에 대한 값을 넘겨줄 경우 그 값
  const uploadDirectory = useMemo(() => {
    if (basePath === currentPath) return '';
    return currentPath.slice(basePath.length + 1);
  }, [basePath, currentPath]);

  const browserQueueLen = useMemo(() => {
    return browserQueue.length;
  }, [browserQueue]);

  const handleClickInput = useCallback(() => {
    fileInputRef?.current?.click();
  }, [fileInputRef]);

  // file input 값 변경 처리
  const handleChangeFileInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    addBrowserQueueFiles(event.target.files ? Array.from(event.target.files) : []);
    event.target.value = '';
  }, []);

  // input 엘리먼트에 등록된 파일 제거
  const handleRemoveInputFile = useCallback((fileName: string) => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const dataTransfer = new DataTransfer();

      Array.from(fileInputRef.current.files).forEach((file) => {
        if (file.name !== fileName) dataTransfer.items.add(file);
      });
      fileInputRef.current.files = dataTransfer.files;
    }
  }, []);

  // browser 영역에 파일 drop 처리리
  const handleOnDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (!browserOption.isDropZone) {
        showError('드롭 허용 영역이 아닙니다', 'caption');
        return;
      }
      //if (isAddDirectoryDialogOpen) return;
      const arrayFiles = Array.from(event.dataTransfer.files);
      if (!arrayFiles.length) return;
      else addBrowserQueueFiles(arrayFiles);
    },
    [browserOption]
  );

  // browser queue에 등록된 파일들 업로드 처리리
  const handleUploadBrowserQueue = useCallback(async () => {
    if (browserOption.appendDirectory) {
      formData?.set('Directory', uploadDirectory);
    }
    browserQueue.forEach((file) => {
      formData?.append('files', file);
    });

    await handleToastPromise(uploadMutation!.mutateAsync(formData!), {
      loading: '업로드 중입니다...',
      success: '성공적으로 업로드되었습니다.',
      error: '업로드 중 에러가 발생했습니다.',
    }).finally(() => {
      formData?.delete('files');
      resetBrowserQueue();
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
      });
    });
  }, [browserQueue, uploadDirectory, currentPath]);

  // dialog queue에 등록된 파일들 업로드 처리
  const handleUploadDialogQueue = useCallback(
    async (directory: string) => {
      const refinedDirectory = uploadDirectory ? uploadDirectory + '/' : uploadDirectory;
      formData?.set('Directory', refinedDirectory + directory);
      dialogQueue.forEach((file) => {
        formData?.append('files', file);
      });

      await handleToastPromise(uploadMutation!.mutateAsync(formData!), {
        loading: '업로드 중입니다...',
        success: '성공적으로 업로드되었습니다.',
        error: '업로드 중 에러가 발생했습니다.',
      }).finally(() => {
        formData?.delete('files');
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
        });
      });
    },
    [dialogQueue, uploadDirectory, currentPath]
  );

  useEffect(() => {
    resetBrowserQueue();
  }, [currentService]);

  _return.current = {
    fileInputRef,
    browserQueueLen,
    handleUploadBrowserQueue,
    handleUploadDialogQueue,
    handleOnDrop,
    handleRemoveInputFile,
    handleChangeFileInput,
    handleClickInput,
  };

  return _return.current;
};
