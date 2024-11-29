import { Grid, styled } from '@mui/material';
import { memo } from 'react';

import EmptyCover from '@/shared/components/ui/empty-cover';
import LoadingCover from '@/shared/components/ui/loadings/loading-cover';

import { useHandleBrowserData } from '../../hooks';
import BrowserFolder from '../atoms/browser-directory';
import BrowserFile from '../atoms/browser-file';
import FileIcon from '../atoms/file-icon';

type FileListProps = {
  currentPath: string;
  browserQueueLen: number;
};
const FileList = ({ currentPath, browserQueueLen }: FileListProps) => {
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
        <BrowserFolder
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
};

const GridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  userSelect: 'none',
});

export default memo(FileList);
