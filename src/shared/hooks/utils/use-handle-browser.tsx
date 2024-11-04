'use client';

import { useCallback, useMemo, useState, KeyboardEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

import { useGetBrowserListQuery } from '../tanstack/use-get-browser-list-query';
import { useRenameBrowserFileMutation } from '../tanstack';
import { BrowserItem } from '../../models';
import { useBrowserStore } from '@/shared/models/stores/use-browser-store';

export const useHandleBrowser = () => {
  const queryClient = useQueryClient();
  const { basePath, currentPath, initPath, setCurrentPath } = useBrowserStore();
  const { data, isPending: isBrowsing, isSuccess } = useGetBrowserListQuery(currentPath);
  const { mutateAsync: renameFile } = useRenameBrowserFileMutation();

  // browse/fild api에서 조회된 목록
  const browsedList = useMemo(() => {
    return data?.items;
  }, [data]);

  // 화면에 보여줄 path
  const displayingPath = useMemo(() => {
    const parts = currentPath.split('/');
    return parts.slice(1).join('/') ?? '/';
  }, [currentPath]);

  // formData에 directory키에 대한 값을 넘겨줄 경우 그 값
  const uploadDirectory = useMemo(() => {
    if (basePath === currentPath) return '';
    return currentPath.slice(basePath.length + 1);
  }, [basePath, currentPath]);

  // 현재 위치의 root 여부
  const isNotRoot = useMemo(() => {
    const slashCnt = currentPath.split('/').length - 1;
    if (slashCnt > 0 && currentPath !== basePath) return true;
    else return false;
  }, [currentPath]);

  // 폴더 아이콘 클릭 처리
  const handleClickDirectory = useCallback(
    (folder: BrowserItem) => {
      const newPath = currentPath + '/' + folder.name;
      setCurrentPath(newPath);
    },
    [currentPath]
  );

  // 이전 버튼 클릭 처리
  const handleClickPrevBtn = useCallback(() => {
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    setCurrentPath(newPath);
  }, [currentPath]);

  // 현재 path에 대한 get browser query 무효화
  const invalidateCurrentPathQuery = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['get-browser-list', currentPath],
    });
  }, [currentPath]);

  const handleRenameFile = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>, oldName: string, newName: string) => {
      if (event.key === 'Enter') {
        toast
          .promise(renameFile({ oldName, newName }), {
            loading: <Typography variant="caption">파일명을 변경중입니다...</Typography>,
            success: <Typography variant="caption">성공적으로 변경되었습니다.</Typography>,
            error: <Typography variant="caption">변경 중 에러가 발생했습니다.</Typography>,
          })
          .finally(() => {
            invalidateCurrentPathQuery();
          });
      }
    },
    [queryClient, currentPath]
  );

  return {
    currentPath,
    displayingPath,
    uploadDirectory,
    isNotRoot,
    browsedList,
    isBrowsing,
    initPath,
    handleClickDirectory,
    handleClickPrevBtn,
    handleRenameFile,
    invalidateCurrentPathQuery,
  };
};
