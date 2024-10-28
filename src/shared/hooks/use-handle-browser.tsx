'use client';

import { useMemo, useRef, useState } from 'react';
import { useGetBrowsedListQuery } from './tanstack/use-get-browsed-list-query';
import { BrowserItem } from '../models';

export const useHandleBrowser = (initialPath: string) => {
  const [basePath, setBasePath] = useState<string>(initialPath);
  const [currentPath, setCurrentPath] = useState<string>(initialPath);
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);
  const { data, isPending: isBrowsing, isSuccess } = useGetBrowsedListQuery(currentPath);
  const inputRef = useRef<HTMLInputElement>(null);

  // browse/fild api에서 조회된 목록
  const browsedList = useMemo(() => {
    return data?.items;
  }, [data]);

  // 현재 위치의 root 여부
  const isNotRoot = useMemo(() => {
    const slashCnt = currentPath.split('/').length - 1;
    if (slashCnt > 1) return true;
    else return false;
  }, [currentPath]);

  // 폴더 아이콘 클릭 처리
  const handleClickFolder = (folder: BrowserItem) => {
    const newPath = currentPath + '/' + folder.name;
    setCurrentPath(newPath);
  };

  // 이전 버튼 클릭 처리
  const handleClickPrevBtn = () => {
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    setCurrentPath(newPath);
  };

  return { currentPath, isNotRoot, browsedList, isBrowsing, handleClickFolder, handleClickPrevBtn };
};
