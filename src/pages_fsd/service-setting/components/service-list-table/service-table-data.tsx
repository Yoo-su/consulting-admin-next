'use client';

import { TableBody, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

import { Service } from '@/shared/models';

import { ServiceTypeCell } from './service-type-cell';
import { SetAppType } from './set-app-type';

type ServiceTableDataProps = {
  serviceList: Service[] | undefined;
  page: number;
  rowsPerPage: number;
};
export const ServiceTableData = ({ serviceList = [], page, rowsPerPage }: ServiceTableDataProps) => {
  const pageRowsStart = page * rowsPerPage;
  const pageRowsEnd = pageRowsStart + rowsPerPage;
  return (
    <TableBody>
      {serviceList.slice(pageRowsStart, pageRowsEnd).map((service) => (
        <TableRow key={service.serviceID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            <b>{service.serviceID}</b>
          </TableCell>
          <TableCell>{service.schoolYear}</TableCell>
          <TableCell>
            <ServiceTypeCell isSusi={parseInt(service.isSusi)} />
          </TableCell>
          <TableCell align="center" sx={{ padding: 0 }}>
            <SetAppType service={service} />
          </TableCell>
          {/* <TableCell align="center">{service.developer ?? '-'}</TableCell> */}
          {/* <TableCell align="center">{service.manager ?? '-'}</TableCell> */}
        </TableRow>
      ))}
    </TableBody>
  );
};
