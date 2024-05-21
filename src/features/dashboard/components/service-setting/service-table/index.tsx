import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Chip,
} from '@mui/material';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Service } from '@/features/dashboard/types/service.type';

type ServiceListTableProps = {
  serviceList: Service[];
};
const ServiceListTable = ({ serviceList }: ServiceListTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
            <TableCell>담당 개발자</TableCell>
            <TableCell>담당 운영자</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((service) => (
            <TableRow key={service.serviceID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {service.serviceID}
              </TableCell>
              <TableCell>{service.schoolYear}</TableCell>
              <TableCell>
                {service.isSusi === '1' ? (
                  <Chip
                    label="수시"
                    size={downmd ? 'small' : 'medium'}
                    sx={{
                      color: 'white',
                      bgcolor: '#1C6A7D',
                    }}
                  />
                ) : (
                  <Chip
                    label="정시"
                    size={downmd ? 'small' : 'medium'}
                    sx={{
                      color: 'white',
                      bgcolor: '#E66245',
                    }}
                  />
                )}
              </TableCell>
              <TableCell>{service.developer ?? '미정'}</TableCell>
              <TableCell>{service.manager ?? '미정'}</TableCell>
            </TableRow>
          ))}
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

export default ServiceListTable;
