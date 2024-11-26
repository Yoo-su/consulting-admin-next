import { Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { KeyboardEvent, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';

import { QUERY_KEYS } from '@/shared/constants';

import { BrowserItem, useBrowserStore } from '../models';
import { useDeleteBrowserFileMutation } from './use-delete-browser-item-mutation';
import { useGetBrowserListQuery } from './use-get-browser-list-query';
import { useRenameBrowserFileMutation } from './use-rename-browser-file-mutation';

export const useHandleBrowserData = (path: string) => {
  const queryClient = useQueryClient();
  const { currentPath, setCurrentPath } = useBrowserStore(
    useShallow((state) => ({
      currentPath: state.currentPath,
      setCurrentPath: state.setCurrentPath,
    }))
  );
  const { data: browserQueryData, isLoading: isBrowsing } =
    useGetBrowserListQuery(path);
  const sortOption = useBrowserStore((state) => state.sortOption);

  const displayingDirectories = useMemo(() => {
    const directories = browserQueryData?.items.filter(
      (item) => item.isDirectory
    );
    return (
      directories?.toSorted((a, b) => sortOption?.sortFunction(a, b)) ?? []
    );
  }, [browserQueryData, sortOption]);

  const displayingFiles = useMemo(() => {
    const directories = browserQueryData?.items.filter(
      (item) => !item.isDirectory
    );
    return (
      directories?.toSorted((a, b) => sortOption?.sortFunction(a, b)) ?? []
    );
  }, [browserQueryData, sortOption]);

  const displayingBrowserData = useMemo(() => {
    return [...displayingDirectories, ...displayingFiles];
  }, [displayingDirectories, displayingFiles]);

  const { mutateAsync: renameFile } = useRenameBrowserFileMutation();
  const { mutateAsync: deleteFile } = useDeleteBrowserFileMutation();

  // 폴더 아이콘 클릭 처리
  const handleClickDirectory = useCallback(
    (folder: BrowserItem) => {
      const newPath = currentPath + '/' + folder.name;
      setCurrentPath(newPath);
    },
    [currentPath]
  );

  // 파일 이름 변경 처리
  const handleRenameFile = useCallback(
    async (
      event: KeyboardEvent<HTMLInputElement>,
      oldName: string,
      newName: string
    ) => {
      if (event.key === 'Enter') {
        toast
          .promise(renameFile({ oldName, newName }), {
            loading: (
              <Typography variant="caption">
                파일명을 변경중입니다...
              </Typography>
            ),
            success: (
              <Typography variant="caption">
                성공적으로 변경되었습니다.
              </Typography>
            ),
            error: (
              <Typography variant="caption">
                변경중 에러가 발생했습니다.
              </Typography>
            ),
          })
          .finally(() => {
            queryClient.invalidateQueries({
              queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
            });
          });
      }
    },
    [queryClient, currentPath]
  );

  const handleDeleteFile = useCallback(
    async (filePath: string) => {
      toast
        .promise(deleteFile(filePath), {
          loading: (
            <Typography variant="caption">파일을 삭제중입니다...</Typography>
          ),
          success: (
            <Typography variant="caption">
              성공적으로 삭제되었습니다.
            </Typography>
          ),
          error: (
            <Typography variant="caption">
              삭제중 에러가 발생했습니다.
            </Typography>
          ),
        })
        .finally(() => {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
          });
        });
    },
    [queryClient, currentPath]
  );

  return {
    displayingBrowserData,
    isBrowsing,
    handleClickDirectory,
    handleRenameFile,
    handleDeleteFile,
  };
};
