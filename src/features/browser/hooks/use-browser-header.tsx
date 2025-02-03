import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useBrowserStore, useQueueStore } from '../models';
import { useGetBrowserListQuery } from './tanstack';

/**
 * @description
 * Browser Header에서 사용되는 값, 메서드를 관리하기 위한 hook
 */
export const useBrowserHeader = () => {
  const { currentPath, basePath, setCurrentPath } = useBrowserStore(
    useShallow((state) => ({
      currentPath: state.currentPath,
      basePath: state.basePath,
      setCurrentPath: state.setCurrentPath,
    }))
  );
  const browserQueue = useQueueStore((state) => state.browserQueue);
  const openAddDirectoryDialog = useQueueStore(useShallow((state) => state.openAddDirectoryDialog));
  const { data } = useGetBrowserListQuery(currentPath);

  // 현재 경로의 아이템 수
  const dataCnt = useMemo(() => {
    return data?.length ?? 0;
  }, [data]);

  // 화면에 보여줄 path
  const displayingPath = useMemo(() => {
    const parts = currentPath.split('/');
    return parts.slice(1).join('/') ?? '/';
  }, [currentPath]);

  // 현재 위치가 base path인지 여부
  const isNotRoot = useMemo(() => {
    const slashCnt = currentPath.split('/').length - 1;
    if (slashCnt > 0 && currentPath !== basePath) return true;
    else return false;
  }, [currentPath, basePath]);

  // 폴더 아이콘 클릭처리
  const handleClickFolderBtn = useCallback(() => {
    if (browserQueue.length) return;
    openAddDirectoryDialog();
  }, [browserQueue]);

  // 이전 버튼 클릭 처리
  const handleClickPrevBtn = useCallback(() => {
    if (browserQueue.length) return;
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    setCurrentPath(newPath);
  }, [currentPath, browserQueue]);

  return {
    isNotRoot,
    displayingPath,
    dataCnt,
    openAddDirectoryDialog,
    handleClickFolderBtn,
    handleClickPrevBtn,
  };
};
