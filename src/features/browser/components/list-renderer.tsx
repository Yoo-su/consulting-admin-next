import { Grid, styled } from '@mui/material';
import { Fragment, useCallback } from 'react';

import { EmptyCover, LoadingCover } from '@/shared/components';

import { BROWSER_EMPTY_MESSAGE, LOADING_MESSAGE } from '../constants';
import { useDisplayingData } from '../hooks';
import { BrowserItem, useQueueStore } from '../models';
import { BrowserDirectory } from './browser-directory';
import { BrowserFile } from './browser-file';
import { QueueFile } from './queue-file';

/**
 * List Rendering을 담당하는 컴포넌트
 * 브라우저 아이템(디렉토리, 파일)과 Queue를 렌더링한다.
 */
type ListRendererProps = {
  handleRemoveInputFile: (fileName: string) => void;
};
export const ListRenderer = ({ handleRemoveInputFile }: ListRendererProps) => {
  const { displayingBrowserData, isBrowsing } = useDisplayingData();
  const browserQueue = useQueueStore((state) => state.browserQueue);
  const removeBrowserQueueFile = useQueueStore(
    (state) => state.removeBrowserQueueFile
  );

  const getBrowserItemComponent = useCallback((item: BrowserItem) => {
    if (item.isDirectory) return <BrowserDirectory directoryName={item.name} />;
    else return <BrowserFile {...item} />;
  }, []);

  const handleRemoveFile = useCallback((fileName: string) => {
    removeBrowserQueueFile(fileName);
    handleRemoveInputFile(fileName);
  }, []);

  const renderContent = () => {
    if (isBrowsing) return <LoadingCover loadingMessage={LOADING_MESSAGE} />;

    if (!browserQueue.length && !displayingBrowserData.length)
      return <EmptyCover message={BROWSER_EMPTY_MESSAGE} />;

    return (
      <>
        {/* render browser items */}
        {displayingBrowserData.map((item) => (
          <Fragment key={item.name}>{getBrowserItemComponent(item)}</Fragment>
        ))}
        {/* render queue items */}
        {browserQueue.map((item) => (
          <QueueFile
            key={item.name}
            name={item.name}
            type={item.type}
            handleRemoveFile={handleRemoveFile}
          />
        ))}
      </>
    );
  };

  return (
    <GridContainer container rowSpacing={2}>
      {renderContent()}
    </GridContainer>
  );
};

const GridContainer = styled(Grid)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2.5, 1.5),
  minHeight: '240px',
  maxHeight: '480px',
  overflowY: 'scroll',
  border: '1px solid rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
}));
