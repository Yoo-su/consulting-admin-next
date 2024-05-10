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
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import AddServiceForm from '../add-service-form';
import { useUnivService } from '@/shared/hooks/use-univ-service';

const ServiceSettingBox = () => {
  const { serviceList, currentUniv } = useUnivService();

  return (
    <Stack direction={'column'} sx={{ mt: 5 }} spacing={5}>
      <AddServiceForm />

      <Divider sx={{ my: 3 }} />
      <Stack direction={'column'} spacing={2}>
        <Typography variant="h6">
          {currentUniv?.univName}({currentUniv?.univID}) 서비스 목록
        </Typography>
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
                  <TableCell>
                    {service.serviceType === 'susi' ? (
                      <Chip
                        label="수시"
                        sx={{
                          color: 'white',
                          bgcolor: '#1C6A7D',
                        }}
                      />
                    ) : (
                      <Chip
                        label="정시"
                        sx={{
                          color: 'white',
                          bgcolor: '#E66245',
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{service.univName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
};
export default ServiceSettingBox;
