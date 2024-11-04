import { memo } from 'react';
import { Grid } from '@mui/material';

import FileIcon from './atoms/file-icon';
import BrowserQueueFile from './atoms/browser-queue-file';

type UploadQueueProps = {
  queueFiles: { name: string; type: string }[];
  handleRemoveFile: (fileName: string) => void;
};

const Queue = ({ queueFiles, handleRemoveFile }: UploadQueueProps) => {
  return (
    <>
      {queueFiles.map((item) => {
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
            <BrowserQueueFile
              fileName={item.name}
              imageChildren={<FileIcon contentType={item.type} />}
              handleRemoveFile={() => handleRemoveFile(item.name)}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default memo(Queue);
