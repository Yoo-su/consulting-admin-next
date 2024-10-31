import { Grid } from '@mui/material';

import BrowserFolder from './atoms/browser-directory';
import BrowserFile from './atoms/browser-file';
import FileIcon from './atoms/file-icon';
import { BrowserItem } from '@/shared/models';

type FileListProps = {
  browsedList: BrowserItem[];
  handleClickDirectory: (folder: BrowserItem) => void;
};

const FileList = ({ browsedList, handleClickDirectory }: FileListProps) => {
  return browsedList.map((browserItem) =>
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
        <BrowserFolder browserItem={browserItem} handleClickDirectory={handleClickDirectory} />
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
        <BrowserFile {...browserItem} imageChildren={<FileIcon extension={browserItem.name.split('.')[1]} />} />
      </Grid>
    )
  );
};

export default FileList;
