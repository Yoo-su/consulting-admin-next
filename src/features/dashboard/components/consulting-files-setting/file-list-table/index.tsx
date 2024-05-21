import { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FileUploader from '../file-uploader';
import FileListData from '../file-list-data';

const EmptyTableCell = () => {
  return <TableCell sx={{ width: '16px' }} />;
};
const NarrowTableCell = ({ children }: { children: ReactNode }) => {
  return (
    <TableCell align="center" sx={{ width: '8%' }}>
      {children}
    </TableCell>
  );
};
const WideTableCell = ({ children }: { children: ReactNode }) => {
  return <TableCell sx={{ width: '50%' }}>{children}</TableCell>;
};

const FileListTable = () => {
  return (
    <Stack direction={'column'} sx={{ mt: 5 }}>
      <TableContainer component={Paper}>
        <Table
          aria-label="file-list-table"
          sx={{
            '& .MuiTableCell-root': { borderBottom: '0px solid black' },
          }}
        >
          <TableHead>
            <TableRow>
              <EmptyTableCell />
              <NarrowTableCell>순서</NarrowTableCell>
              <WideTableCell>자료명</WideTableCell>
              <WideTableCell>파일명</WideTableCell>
              <NarrowTableCell>삭제</NarrowTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <FileListData />
            <FileUploader />
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default FileListTable;
