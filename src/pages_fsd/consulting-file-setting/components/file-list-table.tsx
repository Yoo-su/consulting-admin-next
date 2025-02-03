'use client';

import Stack from '@mui/material/Stack';

import { FileList } from './table-body-list';
import { FileUploader } from './table-body-uploader';
import { TableBox, TableContainerBox, TableRowBox } from './table-customs';
import { TableHeader } from './table-header';

export const FileListTable = () => {
  return (
    <Stack direction={'column'} sx={{ mt: 5 }}>
      <TableContainerBox aria-label="file-list-table">
        <TableBox>
          <TableHeader />
          <TableRowBox>
            <FileList />
          </TableRowBox>
          <TableRowBox>
            <FileUploader />
          </TableRowBox>
        </TableBox>
      </TableContainerBox>
    </Stack>
  );
};
