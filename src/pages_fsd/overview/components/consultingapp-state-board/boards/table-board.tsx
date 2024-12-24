'use client';

import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ChangeEvent, MouseEvent, useState } from 'react';

import { STATE_BOARD_DOMAIN_ITEMS } from '@/pages_fsd/overview/constants';
import { useHandleStatusBoard } from '@/pages_fsd/overview/hooks';
import { useGetUnivListQuery } from '@/shared/hooks';

export const TableBoard = () => {
  const { data: univList } = useGetUnivListQuery();
  const { filteredConsultingAppStatesAll } = useHandleStatusBoard();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table stickyHeader aria-label="consulting-app-state-table">
          <TableHead>
            <TableRow>
              <TableCell>대학명</TableCell>
              <TableCell align="right">서비스ID</TableCell>
              <TableCell align="right">담당 개발자</TableCell>
              <TableCell align="right">담당 운영자</TableCell>
              <TableCell align="right">현재 상태</TableCell>
              <TableCell align="right">신규앱 여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredConsultingAppStatesAll
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                const { color, title } =
                  STATE_BOARD_DOMAIN_ITEMS[item.currentState];
                const currentUniv = univList.filter(
                  (univ) => univ.univID == item.univID
                )[0];
                const univName = currentUniv?.univName || '새대학';
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={univName}>
                    <TableCell component="th" scope="row">
                      {univName}
                    </TableCell>
                    <TableCell align="right">{item.serviceID}</TableCell>
                    <TableCell align="right">{item.developerName}</TableCell>
                    <TableCell align="right">{item.manager}</TableCell>
                    <TableCell align="right">
                      <Chip
                        size="small"
                        label={
                          <Typography variant="caption" color="grey.800">
                            {title}
                          </Typography>
                        }
                        sx={{ bgcolor: color }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {item.isNew ? (
                        <CheckIcon sx={{ color: '#1976D2' }} />
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredConsultingAppStatesAll?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={'페이지 당 아이템 수'}
      />
    </Paper>
  );
};
