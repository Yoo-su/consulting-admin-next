import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { MapTBLRowBorderClass } from '../../constants';
import { UseMapFormReturn } from '../../hooks';
import { MapFormEditSaveButton } from './map-form-button-edit-save';
import { MapFormInputCell } from './map-form-input-cell';

type MapFormBodyProps = {
  isDisabled: boolean;
  mapHookValues: UseMapFormReturn;
};

export const MapFormBody = ({
  mapHookValues,
  isDisabled,
}: MapFormBodyProps) => {
  const { rows, objValue, setObjValue, isEditObj } = mapHookValues;

  const isNotEdit = (index: number) => isEditObj[index] == false || isDisabled;

  return (
    <>
      {rows.map((row, index) => (
        <TableRow key={row.item} sx={MapTBLRowBorderClass}>
          {isNotEdit(index) ? (
            <>
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell>{row.value}</TableCell>
            </>
          ) : (
            <MapFormInputCell
              index={`${index}`}
              objValue={objValue}
              setObjValue={setObjValue}
            />
          )}
          <TableCell>
            <MapFormEditSaveButton
              mapHookValues={mapHookValues}
              index={index}
              isDisabled={isDisabled}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
