import { useMemo } from 'react';

import { useBrowserStore } from '@/shared/models';

import { useGetBrowserListQuery } from '../tanstack';

export const useHandleBrowserData = (path: string) => {
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

  return { displayingBrowserData, isBrowsing };
};
