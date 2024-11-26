import { Grid } from '@mui/material';
import { memo } from 'react';

import { useHandleBrowserData } from '../../hooks';
import BrowserFolder from '../atoms/browser-directory';
import BrowserFile from '../atoms/browser-file';
import FileIcon from '../atoms/file-icon';

type FileListProps = {
  currentPath: string;
};
const FileList = ({ currentPath }: FileListProps) => {
  const {
    displayingBrowserData,
    handleClickDirectory,
    handleRenameFile,
    handleDeleteFile,
  } = useHandleBrowserData(currentPath);
  return displayingBrowserData.map((browserItem) =>
    browserItem.isDirectory ? (
      <Grid
        item
        display="flex"
        key={browserItem.name}
        justifyContent="center"
        alignItems="center"
        height="fit-content"
        sx={{ userSelect: 'none' }}
        xs={3}
        md={2}
        lg={1.2}
        xl={1}
      >
        <BrowserFolder
          browserItem={browserItem}
          handleClickDirectory={handleClickDirectory}
        />
      </Grid>
    ) : (
      <Grid
        item
        display="flex"
        key={browserItem.name}
        justifyContent="center"
        alignItems="center"
        height="fit-content"
        sx={{ userSelect: 'none' }}
        xs={3}
        md={2}
        lg={1.2}
        xl={1}
      >
        <BrowserFile
          {...browserItem}
          imageChildren={
            <FileIcon contentType={browserItem.contentType ?? ''} />
          }
          handleRenameFile={handleRenameFile}
          handleDeleteFile={handleDeleteFile}
        />
      </Grid>
    )
  );
};

export default memo(FileList);
