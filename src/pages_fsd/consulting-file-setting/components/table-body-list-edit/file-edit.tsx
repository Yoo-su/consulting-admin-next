'use client';

import DragHandleIcon from '@mui/icons-material/DragHandle';
import IconButton from '@mui/material/IconButton';

import { ConsultingFile } from '../../models';
import { CellBoxCustomWidth } from '../table-customs';
import { FileEditDelete } from './file-edit-delete';
import { FileEditDownload } from './file-edit-download';
import { FileEditName } from './file-edit-name';

export const FileEdit = ({ file }: { file: ConsultingFile }) => {
  return (
    <>
      <CellBoxCustomWidth size="xs">
        <IconButton disableRipple sx={{ width: '5px' }}>
          <DragHandleIcon fontSize="small" />
        </IconButton>
      </CellBoxCustomWidth>
      <CellBoxCustomWidth size="s" typo={true}>
        {file.RefNo}
      </CellBoxCustomWidth>
      <CellBoxCustomWidth size="m" style={{ minWidth: '350px', paddingLeft: '5px', paddingRight: '5px' }}>
        <FileEditName file={file} />
      </CellBoxCustomWidth>
      <FileEditDownload fileName={file.FileName} />
      <CellBoxCustomWidth size="s" style={{ paddingLeft: 0 }}>
        <FileEditDelete file={file} />
      </CellBoxCustomWidth>
    </>
  );
};
