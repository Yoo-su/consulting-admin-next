'use client';

import { Grid, styled } from '@mui/material';
import { memo } from 'react';

import { EmptyCover, LoadingCover } from '@/shared/components';

import { useHandleBrowserData } from '../../hooks';
import { BrowserDirectory, BrowserFile, FileIcon } from '../atoms';

type FileListProps = {
  currentPath: string;
  browserQueueLen: number;
};
export const FileList = memo(
  ({ currentPath, browserQueueLen }: FileListProps) => {
    const {
      displayingBrowserData,
      isBrowsing,
      handleClickDirectory,
      handleRenameFile,
      handleDeleteFile,
    } = useHandleBrowserData(currentPath);

    if (isBrowsing)
      return (
        <LoadingCover loadingMessage={'폴더 및 파일을 불러오는 중입니다...'} />
      );

    if (!browserQueueLen && !displayingBrowserData.length)
      return <EmptyCover message={'폴더 또는 파일이 없습니다'} />;

    return displayingBrowserData.map((browserItem) =>
      browserItem.isDirectory ? (
        <GridItem item key={browserItem.name} xs={3} md={2} lg={1.2} xl={1}>
          <BrowserDirectory
            browserItem={browserItem}
            handleClickDirectory={handleClickDirectory}
          />
        </GridItem>
      ) : (
        <GridItem item key={browserItem.name} xs={3} md={2} lg={1.2} xl={1}>
          <BrowserFile
            {...browserItem}
            imageChildren={
              <FileIcon contentType={browserItem.contentType ?? ''} />
            }
            handleRenameFile={handleRenameFile}
            handleDeleteFile={handleDeleteFile}
          />
        </GridItem>
      )
    );
  }
);
FileList.displayName = 'FileList';

const GridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  userSelect: 'none',
});
