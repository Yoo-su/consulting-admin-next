'use client';

import { Grid, styled } from '@mui/material';
import { memo, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useBrowserStore, useQueueStore } from '../../models';
import { QueueFile } from './queue-file';

type QueueProps = {
  handleRemoveInputFile: (fileName: string) => void;
};
export const Queue = memo(({ handleRemoveInputFile }: QueueProps) => {
  const { browserQueue, removeBrowserQueueFile } = useQueueStore();
  const itemAppearance = useBrowserStore(
    useShallow((state) => state.browserOption.itemAppearance)
  );
  const xsGridItemSize = useMemo(() => {
    if (itemAppearance === 'card') return 3;
    else return 2;
  }, [itemAppearance]);
  const smGridItemSize = useMemo(() => {
    if (itemAppearance === 'card') return 3;
    else return 1.5;
  }, [itemAppearance]);

  const handleRemoveFile = (fileName: string) => {
    removeBrowserQueueFile(fileName);
    handleRemoveInputFile(fileName);
  };

  return (
    <>
      {browserQueue.map((item) => {
        console.log(item, typeof item);
        return (
          <GridItem
            item
            key={item.name}
            xs={xsGridItemSize}
            sm={smGridItemSize}
          >
            <QueueFile
              name={item.name}
              type={item.type}
              handleRemoveFile={handleRemoveFile}
            />
          </GridItem>
        );
      })}
    </>
  );
});
Queue.displayName = 'Queue';

const GridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  userSelect: 'none',
});
