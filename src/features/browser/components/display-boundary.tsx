import { Grid, styled } from '@mui/material';
import { ReactNode, useCallback } from 'react';

import { EmptyCover, LoadingCover } from '@/shared/components';

import { BROWSER_EMPTY_MESSAGE, LOADING_MESSAGE } from '../constants';
import { useDisplayingData } from '../hooks';
import { useQueueStore } from '../models';

type BrowserDisplayBoundaryProps = {
  children: ReactNode;
};
export const BrowserDisplayBoundary = ({ children }: BrowserDisplayBoundaryProps) => {
  const { isBrowsing, displayingBrowserData } = useDisplayingData();
  const browserQueue = useQueueStore((state) => state.browserQueue);

  const renderContent = useCallback(() => {
    if (isBrowsing) return <LoadingCover loadingMessage={LOADING_MESSAGE} />;

    if (!displayingBrowserData.length && !browserQueue.length) return <EmptyCover message={BROWSER_EMPTY_MESSAGE} />;

    return children;
  }, [isBrowsing, displayingBrowserData, browserQueue, children]);

  return (
    <GridContainer container rowGap={2}>
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
