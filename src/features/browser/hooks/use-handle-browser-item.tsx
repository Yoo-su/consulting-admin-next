import { KeyboardEvent, useCallback, useRef } from 'react';

import { API_URLS } from '@/shared/constants';
import { useDownloadFile } from '@/shared/hooks';
import { handleToastPromise } from '@/shared/services/handle-toast-promise';

import { useBrowserMutation } from '.';

type UseHandleBrowserItemReturn = {
  isDeleteBrowserFileLoading: boolean;
  isRenameBrowserFileLoading: boolean;
  handleRenameBrowserFile: (event: KeyboardEvent<HTMLInputElement>, oldName: string, newName: string) => void;
  handleDeleteBrowserFile: (filePath: string) => void;
  handleDownloadFile: (filePath: string, fileName: string) => Promise<void>;
};

/**
 * @description
 * Browser 파일과 관련한 기능(삭제, 파일명변경, 다운로드 등) 메서드를 관리하는 hook
 */
export const useHandleBrowserItem = () => {
  const _return = useRef<UseHandleBrowserItemReturn>();
  const { renameBrowserFile, deleteBrowserFile, isDeleteBrowserFileLoading, isRenameBrowserFileLoading } =
    useBrowserMutation();
  const { downloadFile } = useDownloadFile();

  const handleRenameBrowserFile = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, oldName: string, newName: string) => {
      if (event.key === 'Enter') {
        handleToastPromise(renameBrowserFile({ oldName, newName }), {
          loading: '파일명을 변경중입니다...',
          success: '성공적으로 변경되었습니다.',
          error: '변경중 에러가 발생했습니다.',
        });
      }
    },
    [renameBrowserFile]
  );

  const handleDeleteBrowserFile = useCallback(
    (filePath: string) => {
      handleToastPromise(deleteBrowserFile(filePath), {
        loading: '파일을 삭제중입니다...',
        success: '성공적으로 삭제되었습니다.',
        error: '삭제중 에러가 발생했습니다.',
      });
    },
    [deleteBrowserFile]
  );

  const handleDownloadFile = useCallback(
    async (filePath: string, fileName: string) => {
      const encoded = encodeURIComponent(decodeURIComponent(filePath));
      const url = `${process.env.NEXT_PUBLIC_BASE_URL + API_URLS.dashboard.downloadBrowserFile}/${encoded}`;
      await downloadFile(url, fileName);
    },
    [downloadFile]
  );

  _return.current = {
    isDeleteBrowserFileLoading,
    isRenameBrowserFileLoading,
    handleRenameBrowserFile,
    handleDeleteBrowserFile,
    handleDownloadFile,
  };

  return _return.current;
};
