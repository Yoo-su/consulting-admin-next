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
              <TableCell sx={{ width: '16px' }}></TableCell>
              <TableCell align="center" sx={{ width: '8%' }}>
                순서
              </TableCell>
              <TableCell sx={{ width: '35%' }}>자료명</TableCell>
              <TableCell>파일명</TableCell>
              <TableCell align="center" sx={{ width: '8%' }}>
                삭제
              </TableCell>
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
