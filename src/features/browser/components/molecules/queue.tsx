'use client';

import { Grid, styled } from '@mui/material';
import { memo } from 'react';

import { useQueueStore } from '../../models';
import { FileIcon, QueueFile } from '../atoms';

type QueueProps = {
  handleRemoveInputFile: (fileName: string) => void;
};
export const Queue = memo(({ handleRemoveInputFile }: QueueProps) => {
  const { browserQueue, removeBrowserQueueFile } = useQueueStore();

  const handleRemoveFile = (fileName: string) => {
    removeBrowserQueueFile(fileName);
    handleRemoveInputFile(fileName);
  };

  return (
    <>
      {browserQueue.map((item) => {
        return (
          <GridItem item key={item.name} xs={3} md={2} lg={1.2} xl={1}>
            <QueueFile
              fileName={item.name}
              imageChildren={<FileIcon contentType={item.type} />}
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
