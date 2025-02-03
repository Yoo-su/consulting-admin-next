'use client';

import { Paper, Table, TableContainer } from '@mui/material';
import { useState } from 'react';

import { useGetServiceListQuery } from '@/shared/hooks';

import { ServiceTableData } from './service-table-data';
import { ServiceTableHead } from './service-table-head';
import { ServiceTablePagination } from './service-table-pagination';

type ServiceListTableProps = {
  univID: string | undefined;
};
export const ServiceListTable = ({ univID }: ServiceListTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: serviceList } = useGetServiceListQuery(univID);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="service-list-table">
        <ServiceTableHead />
        {<ServiceTableData serviceList={serviceList} page={page} rowsPerPage={rowsPerPage} />}
      </Table>
      <ServiceTablePagination
        count={serviceList?.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </TableContainer>
  );
};
