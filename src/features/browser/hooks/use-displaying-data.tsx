import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useBrowserStore } from '../models';
import { useGetBrowserListQuery } from './use-get-browser-list-query';

export const useDisplayingData = () => {
  const { currentPath, sortOption } = useBrowserStore(
    useShallow((state) => ({
      currentPath: state.currentPath,
      sortOption: state.sortOption,
    }))
  );
  const { data: browserQueryData, isLoading: isBrowsing } =
    useGetBrowserListQuery(currentPath);

  // 화면에 보여줄 디렉토리 목록
  const displayingDirectories = useMemo(() => {
    const directories = browserQueryData?.items.filter(
      (item) => item.isDirectory
    );
    return (
      directories?.toSorted((a, b) => sortOption?.sortFunction(a, b)) ?? []
    );
  }, [browserQueryData, sortOption]);

  // 화면에 보여줄 파일 목록
  const displayingFiles = useMemo(() => {
    const directories = browserQueryData?.items.filter(
      (item) => !item.isDirectory
    );
    return (
      directories?.toSorted((a, b) => sortOption?.sortFunction(a, b)) ?? []
    );
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
