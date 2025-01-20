'use client';

import DragHandleIcon from '@mui/icons-material/DragHandle';
import IconButton from '@mui/material/IconButton';

import { ConsultingFile } from '../../models';
import {
  CustomWidthBoxCell,
  FileDeleteOne,
  FileDownloader,
  FileNameEditor,
} from '../elements';

export const EditFile = ({ file }: { file: ConsultingFile }) => {
  return (
    <>
      <CustomWidthBoxCell size="xs">
        <IconButton disableRipple sx={{ width: '5px' }}>
          <DragHandleIcon fontSize="small" />
        </IconButton>
      </CustomWidthBoxCell>
      <CustomWidthBoxCell size="s" typo={true}>
        {file.RefNo}
      </CustomWidthBoxCell>
      <CustomWidthBoxCell
        size="m"
        style={{ minWidth: '350px', paddingLeft: '5px', paddingRight: '5px' }}
      >
        <FileNameEditor file={file} />
      </CustomWidthBoxCell>
      <FileDownloader fileName={file.FileName} />
      <CustomWidthBoxCell size="s" style={{ paddingLeft: 0 }}>
        <FileDeleteOne file={file} />
      </CustomWidthBoxCell>
    </>
  );
};
