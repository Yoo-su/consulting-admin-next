'use client';

import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ChangeEvent, MouseEvent, useMemo, useState } from 'react';

import { STATE_BOARD_DOMAIN_ITEMS } from '@/pages_fsd/overview/constants';
import { useHandleStatusBoard } from '@/pages_fsd/overview/hooks';
import { useUnivService } from '@/shared/hooks';
import {
  ConsultingAppState,
  TableBoardType,
} from '@/pages_fsd/overview/models';
import { TableSortLabel } from '@mui/material';

type Order = 'asc' | 'desc';
export const TableBoard = () => {
  const { univList } = useUnivService();
  const { filteredConsultingAppStatesAll } = useHandleStatusBoard();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof TableBoardType>('univID');
  const [order, setOrder] = useState<Order>('asc');

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
  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof TableBoardType
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const createSortHandler =
    (property: keyof TableBoardType) => (event: MouseEvent<unknown>) => {
      handleRequestSort(event, property);
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
    order: Order,
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
  }, [order, orderBy, page, rowsPerPage]);
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table stickyHeader aria-label="consulting-app-state-table">
          <TableHead>
            <TableRow>
              {HeadCells.map((headCell) => {
                return (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((item) => {
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
                  <TableCell align="right">{item.managerName}</TableCell>
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
        rowsPerPageOptions={[5, 10, 25, 30]}
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

const HeadCells: readonly {
  id: keyof TableBoardType;
  label: string;
  align: TableCellProps['align'];
}[] = [
  {
    id: 'univID',
    label: '대학명',
    align: 'left',
  },
  {
    id: 'serviceID',
    label: '서비스ID',
    align: 'right',
  },
  {
    id: 'developerName',
    label: '담당 개발자',
    align: 'right',
  },
  {
    id: 'managerName',
    label: '담당 운영자',
    align: 'right',
  },
  {
    id: 'currentState',
    label: '현재 상태',
    align: 'right',
  },
  {
    id: 'isNew',
    label: '신규앱 여부',
    align: 'right',
  },
];
