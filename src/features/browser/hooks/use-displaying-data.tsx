import { useMemo } from 'react';

import { useBrowserStore } from '../models';
import { useGetBrowserListQuery } from './tanstack';

/**
 * @description
 * Browser에 실제로 렌더링 할 값을 관리하기 위한 hook
 * 정렬 기준을 적용하고, 디렉토리 -> 파일 순서로 그린다.
 */
export const useDisplayingData = () => {
  const currentPath = useBrowserStore((state) => state.currentPath);
  const sortOption = useBrowserStore((state) => state.sortOption);
  const { data: browserQueryData, isLoading: isBrowsing } = useGetBrowserListQuery(currentPath);

  // 화면에 보여줄 디렉토리 목록
  const displayingDirectories = useMemo(() => {
    const directories = browserQueryData?.items.filter((item) => item.isDirectory);
    return directories?.toSorted((a, b) => sortOption?.sortFunction(a, b)) ?? [];
  }, [browserQueryData, sortOption]);

  // 화면에 보여줄 파일 목록
  const displayingFiles = useMemo(() => {
    const directories = browserQueryData?.items.filter((item) => !item.isDirectory);
    return directories?.toSorted((a, b) => sortOption?.sortFunction(a, b)) ?? [];
  }, [browserQueryData, sortOption]);

  // 화면에 보여줄 데이터 (디렉토리 + 파일)
  const displayingBrowserData = useMemo(() => {
    return [...displayingDirectories, ...displayingFiles];
  }, [displayingDirectories, displayingFiles]);

  return {
    displayingBrowserData,
    isBrowsing,
  };
};
