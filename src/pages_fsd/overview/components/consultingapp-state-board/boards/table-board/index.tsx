import { Paper, Table, TableContainer, TablePagination } from '@mui/material';
import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';

import { useHandleStatusBoard } from '@/pages_fsd/overview/hooks';
import { ConsultingAppState, TableBoardType } from '@/pages_fsd/overview/models';

import { TableBoardBody } from './table-board-body';
import { TableBoardHeader } from './table-board-header';

export const TableBoard = () => {
  const { filteredConsultingAppStatesAll } = useHandleStatusBoard();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof TableBoardType>('univID');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof TableBoardType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const bValue = b[orderBy] == undefined ? '' : b[orderBy];
    const aValue = a[orderBy] == undefined ? '' : a[orderBy];
    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof TableBoardType>(
    order: 'asc' | 'desc',
    orderBy: Key
  ): (a: ConsultingAppState, b: ConsultingAppState) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const visibleRows = useMemo(() => {
    return [...filteredConsultingAppStatesAll]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredConsultingAppStatesAll, order, orderBy, page, rowsPerPage]);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table stickyHeader aria-label="consulting-app-state-table">
          <TableBoardHeader order={order} orderBy={orderBy} handleRequestSort={handleRequestSort} />
          <TableBoardBody visibleRows={visibleRows} />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 30]}
        component="div"
        count={filteredConsultingAppStatesAll?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="페이지 당 아이템 수"
      />
    </Paper>
  );
};
