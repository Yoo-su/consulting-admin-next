'use client';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { ChangeEvent, MouseEvent, useState } from 'react';

import { Service } from '@/shared/models';

import { ServiceTableData } from './service-table-data';

type ServiceListTableProps = {
  serviceList: Service[];
};
export const ServiceListTable = ({ serviceList }: ServiceListTableProps) => {
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
    <TableContainer component={Paper}>
      <Table aria-label="service-list-table">
        <TableHead>
          <TableRow>
            <TableCell>서비스ID</TableCell>
            <TableCell>서비스년도</TableCell>
            <TableCell>서비스유형</TableCell>
            <TableCell align="center">담당 개발자</TableCell>
            <TableCell align="center">담당 운영자</TableCell>
            <TableCell align="center">앱 타입</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <ServiceTableData
            serviceList={serviceList}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={serviceList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={'페이지 당 아이템 수'}
      />
    </TableContainer>
  );
};
