import { Grid } from '@mui/material';

import BrowserFolder from './atoms/browser-folder';
import BrowserFile from './atoms/browser-file';
import FileIcon from './atoms/file-icon';
import { BrowserItem } from '@/shared/models';

type FileListProps = {
  browsedList: BrowserItem[];
  handleClickFolder: (folder: BrowserItem) => void;
};

const FileList = ({ browsedList, handleClickFolder }: FileListProps) => {
  return browsedList.map((browserItem) =>
    browserItem.isDirectory ? (
      <Grid
        display="flex"
        key={browserItem.name}
        justifyContent="center"
        alignItems="center"
        height="fit-content"
        sx={{ userSelect: 'none' }}
        xs={3}
        md={2}
        lg={1}
        xl={1}
      >
        <BrowserFolder browserItem={browserItem} handleClickFolder={handleClickFolder} />
      </Grid>
    ) : (
      <Grid
        display="flex"
        key={browserItem.name}
        justifyContent="center"
        alignItems="center"
        height="fit-content"
        sx={{ userSelect: 'none' }}
        xs={3}
        md={2}
        lg={1}
        xl={1}
      >
        <BrowserFile {...browserItem} imageChildren={<FileIcon extension={browserItem.name.split('.')[1]} />} />
      </Grid>
    )
  );
};

export default FileList;
