'use client';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useUnivService } from '@/shared/hooks/use-univ-service';

const ServiceListTable = () => {
  const { serviceList } = useUnivService();

  return (
    <Stack direction={'column'} sx={{ mt: 5 }}>
      <TableContainer component={Paper}>
        <Table aria-label="service-list-table">
          <TableHead>
            <TableRow>
              <TableCell>서비스ID</TableCell>
              <TableCell>서비스년도</TableCell>
              <TableCell>서비스유형</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceList.map((service) => (
              <TableRow key={service.serviceID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {service.serviceID}
                </TableCell>
                <TableCell>{service.serviceYear}</TableCell>
                <TableCell>{service.serviceType === 'susi' ? '수시' : '정시'}</TableCell>
                <TableCell>{service.univName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
export default ServiceListTable;
