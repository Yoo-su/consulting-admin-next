'use client';

import { Grid, styled } from '@mui/material';
import { memo, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { EmptyCover, LoadingCover } from '@/shared/components';

import { useDisplayingData } from '../../hooks';
import { useBrowserStore, useQueueStore } from '../../models';
import { BrowserDirectory } from './browser-directory';
import { BrowserFile } from './browser-file';

export const Content = memo(() => {
  const itemAppearance = useBrowserStore(
    useShallow((state) => state.browserOption.itemAppearance)
  );
  const browserQueueLength = useQueueStore(
    (state) => state.browserQueue.length
  );
  const { displayingBrowserData, isBrowsing } = useDisplayingData();

  const xsGridItemSize = useMemo(() => {
    if (itemAppearance === 'card') return 3;
    else return 2;
  }, [itemAppearance]);
  const smGridItemSize = useMemo(() => {
    if (itemAppearance === 'card') return 3;
    else return 1.5;
  }, [itemAppearance]);

  if (isBrowsing)
    return (
      <LoadingCover loadingMessage={'폴더 및 파일을 불러오는 중입니다...'} />
    );

  if (!browserQueueLength && !displayingBrowserData.length)
    return <EmptyCover message={'폴더 또는 파일이 없습니다'} />;

  return displayingBrowserData.map((browserItem) =>
    browserItem.isDirectory ? (
      <GridItem
        item
        key={browserItem.name}
        xs={xsGridItemSize}
        sm={smGridItemSize}
      >
        <BrowserDirectory directoryName={browserItem.name} />
      </GridItem>
    ) : (
      <GridItem
        item
        key={browserItem.name}
        xs={xsGridItemSize}
        sm={smGridItemSize}
      >
        <BrowserFile {...browserItem} />
      </GridItem>
    )
  );
});
Content.displayName = 'Content';

const GridItem = styled(Grid)({
  flexBasis: '100%',
  minWidth: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  userSelect: 'none',
});
