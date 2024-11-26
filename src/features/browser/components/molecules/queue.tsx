import { Grid, styled } from '@mui/material';
import { memo } from 'react';

import { useQueueStore } from '../../models';
import FileIcon from '../atoms/file-icon';
import QueueFile from '../atoms/queue-file';

type QueueProps = {
  handleRemoveInputFile: (fileName: string) => void;
};
const Queue = ({ handleRemoveInputFile }: QueueProps) => {
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
};

const GridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'fit-content',
  userSelect: 'none',
});

export default memo(Queue);
