import { TableRow, TableCell, Chip } from '@mui/material';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getCurrentServiceYear } from '@/features/dashboard/services/get-current-service-year';

import { Service } from '@/features/dashboard/types/service.type';
import SetAppType from '../set-app-type';

type ServiceTableDataProps = {
  serviceList: Service[];
  page: number;
  rowsPerPage: number;
};
const ServiceTableData = ({ serviceList, page, rowsPerPage }: ServiceTableDataProps) => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  const [isNew, setIsNew] = useState(serviceList.map((service) => service.isNew || false));
  const currentServiceYear = getCurrentServiceYear();

  const handleIsNew = (event: MouseEvent<HTMLSpanElement>, value: boolean) => {
    if (value === null) return;
    setIsNew((prev) => {
      const newIsNew = [...prev];
      newIsNew[parseInt(event.currentTarget.id)] = value;
      return newIsNew;
    });
  };
  return (
    <>
      {serviceList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((service, index) => (
        <TableRow key={service.serviceID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {service.serviceID}
          </TableCell>
          <TableCell>{service.schoolYear}</TableCell>
          <TableCell>
            <Chip
              label={ServiceTypeChip.label[parseInt(service.isSusi)]}
              size={downmd ? 'small' : 'medium'}
              sx={{
                color: 'white',
                bgcolor: ServiceTypeChip.bgcolor[parseInt(service.isSusi)],
              }}
            />
          </TableCell>
          <TableCell align="center">{service.developer ?? '미정'}</TableCell>
          <TableCell align="center">{service.manager ?? '미정'}</TableCell>
          <TableCell align="center" sx={{ padding: 0 }}>
            <SetAppType
              isNew={isNew}
              index={index}
              onClick={handleIsNew}
              isCurrent={currentServiceYear.toString() == service.schoolYear}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default ServiceTableData;

const ServiceTypeChip = {
  label: ['정시', '수시'],
  bgcolor: ['#E66245', '#1C6A7D'],
};
