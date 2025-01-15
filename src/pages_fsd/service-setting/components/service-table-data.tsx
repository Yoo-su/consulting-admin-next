'use client';

import { Chip, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';

import { Service } from '@/shared/models';

import { SetAppType } from './set-app-type';

type ServiceTableDataProps = {
  serviceList: Service[];
  page: number;
  rowsPerPage: number;
};
export const ServiceTableData = ({
  serviceList,
  page,
  rowsPerPage,
}: ServiceTableDataProps) => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));

  const [isNew, setIsNew] = useState(
    serviceList.map((service) => service.isNew || false)
  );

  return (
    <>
      {serviceList
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((service, index) => (
          <TableRow
            key={service.serviceID}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <b>{service.serviceID}</b>
            </TableCell>
            <TableCell>{service.schoolYear}</TableCell>
            <TableCell>
              <Chip
                label={ServiceTypeChip.label[parseInt(service.isSusi)]}
                size={downmd ? 'small' : 'medium'}
                sx={{
                  color: ServiceTypeChip.color[parseInt(service.isSusi)],
                  bgcolor: ServiceTypeChip.bgcolor[parseInt(service.isSusi)],
                }}
              />
            </TableCell>
            <TableCell align="center" sx={{ padding: 0 }}>
              <SetAppType
                isNew={isNew}
                index={index}
                setIsNew={setIsNew}
                service={service}
              />
            </TableCell>
            {/* <TableCell align="center">{service.developer ?? '-'}</TableCell> */}
            {/* <TableCell align="center">{service.manager ?? '-'}</TableCell> */}
          </TableRow>
        ))}
    </>
  );
};

const ServiceTypeChip = {
  label: ['정시', '수시'],
  bgcolor: ['#1b5db7', '#ffc00d'], // #db5a09, #394056
  color: ['white', '#2c4059'],
};
