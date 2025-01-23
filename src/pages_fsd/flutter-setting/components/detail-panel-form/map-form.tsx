'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {
  MapTBLHeaderBorderClass,
  MapTBLHeaderCellClass,
} from '../../constants';
import { useMapForm } from '../../hooks';
import { FormItemProps } from '../../models';
import { MapFormBody } from './map-form-body';
import { MapFormAddCancelButton } from './map-form-button-add-cancel';
import { MapFormCreateNewButton } from './map-form-button-create-new';

export const MapForm = ({
  item,
  path,
  handleEdit,
  isDisabled,
}: Partial<Pick<FormItemProps, 'item'>> & Omit<FormItemProps, 'item'>) => {
  const mapHookValues = useMapForm({ item, path, handleEdit, isDisabled });

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: '100%' }} size="small" aria-label="map table">
          <TableHead>
            <TableRow sx={MapTBLHeaderBorderClass}>
              <TableCell sx={MapTBLHeaderCellClass}>Item</TableCell>
              <TableCell sx={MapTBLHeaderCellClass}>Value</TableCell>
              <TableCell sx={{ width: '30%' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: 0 }}>
            <MapFormBody mapHookValues={mapHookValues} />
            <MapFormAddCancelButton mapHookValues={mapHookValues} />
          </TableBody>
        </Table>
      </TableContainer>
      <MapFormCreateNewButton mapHookValues={mapHookValues} />
    </>
  );
};
