'use client';

import Stack from '@mui/material/Stack';

import { FileListData, TableHeader } from './core';
import { FileUploader, TableBox, TableContainerBox, TableRowBox } from './elements';

export const FileListTable = () => {
  return (
    <Stack direction={'column'} sx={{ mt: 5 }}>
      <TableContainerBox aria-label="file-list-table">
        <TableBox>
          <TableHeader />
          <TableRowBox>
            <FileListData />
          </TableRowBox>
          <TableRowBox>
            <FileUploader />
          </TableRowBox>
        </TableBox>
      </TableContainerBox>
    </Stack>
  );
};
