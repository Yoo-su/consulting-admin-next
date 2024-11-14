import { memo } from 'react';
import { Grid } from '@mui/material';

import FileIcon from '../atoms/file-icon';
import QueueFile from '../atoms/queue-file';
import { useQueueStore } from '@/shared/models/stores';

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
          <Grid
            item
            display="flex"
            key={item.name}
            justifyContent="center"
            alignItems="center"
            height="fit-content"
            sx={{ userSelect: 'none' }}
            xs={3}
            md={2}
            lg={1.2}
            xl={1}
          >
            <QueueFile
              fileName={item.name}
              imageChildren={<FileIcon contentType={item.type} />}
              handleRemoveFile={handleRemoveFile}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default memo(Queue);
