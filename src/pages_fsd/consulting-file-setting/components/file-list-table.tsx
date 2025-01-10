'use client';

import Stack from '@mui/material/Stack';

import { FileListData } from './file-list-data';
import { FileUploader } from './file-uploader';
import {
  CustomWidthBoxCell,
  TableBox,
  TableContainerBox,
  TableRowBox,
} from './table-components';
import { memo } from 'react';

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

const TableHeader = memo(() => (
  <TableRowBox>
    <CustomWidthBoxCell size="xs" style={{ width: '8px' }} />
    <CustomWidthBoxCell typo={true} size="s">
      순서
    </CustomWidthBoxCell>
    <CustomWidthBoxCell typo={true} size="m">
      자료명
    </CustomWidthBoxCell>
    <CustomWidthBoxCell typo={true} size="m">
      파일명
    </CustomWidthBoxCell>
    <CustomWidthBoxCell size="s">삭제</CustomWidthBoxCell>
  </TableRowBox>
));
