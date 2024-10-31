'use client';

import { useMemo, useState } from 'react';
import { useGetBrowserListQuery } from './tanstack/use-get-browser-list-query';
import { BrowserItem } from '../models';

export const useHandleBrowser = (initialPath: string) => {
  const [basePath, setBasePath] = useState<string>(initialPath);
  const [currentPath, setCurrentPath] = useState<string>(initialPath);
  const { data, isPending: isBrowsing, isSuccess } = useGetBrowserListQuery(currentPath);

  // browse/fild api에서 조회된 목록
  const browsedList = useMemo(() => {
    return data?.items;
  }, [data]);

  const displayingPath = useMemo(() => {
    const parts = currentPath.split('/');
    return parts.slice(1).join('/') ?? '/';
  }, [currentPath]);

  const currentDirectory = useMemo(() => {
    return currentPath.split('/').at(-1) ?? '';
  }, [currentPath]);

  // 현재 위치의 root 여부
  const isNotRoot = useMemo(() => {
    const slashCnt = currentPath.split('/').length - 1;
    if (slashCnt > 0 && currentPath !== basePath) return true;
    else return false;
  }, [currentPath]);

  // 폴더 아이콘 클릭 처리
  const handleClickDirectory = (folder: BrowserItem) => {
    const newPath = currentPath + '/' + folder.name;
    setCurrentPath(newPath);
  };

  // 이전 버튼 클릭 처리
  const handleClickPrevBtn = () => {
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    setCurrentPath(newPath);
  };

  return {
    currentPath,
    displayingPath,
    currentDirectory,
    isNotRoot,
    browsedList,
    isBrowsing,
    handleClickDirectory,
    handleClickPrevBtn,
  };
};
