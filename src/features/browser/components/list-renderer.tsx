import { Fragment, memo, useCallback } from 'react';

import { useDisplayingData } from '../hooks';
import { BrowserItem } from '../models';
import { BrowserDirectory } from './browser-directory';
import { BrowserFile } from './browser-file';

export const ListRenderer = memo(() => {
  const { displayingBrowserData } = useDisplayingData();

  const getBrowserItemComponent = useCallback((item: BrowserItem) => {
    if (item.isDirectory) return <BrowserDirectory directoryName={item.name} />;
    else return <BrowserFile {...item} />;
  }, []);

  return (
    <>
      {/* render browser items */}
      {displayingBrowserData.map((item) => (
        <Fragment key={item.name}>{getBrowserItemComponent(item)}</Fragment>
      ))}
    </>
  );
});
ListRenderer.displayName = 'ListRenderer';
