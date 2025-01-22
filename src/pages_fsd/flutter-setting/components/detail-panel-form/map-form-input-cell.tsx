import { TextField } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { MapTBLTextFieldClass } from '../../constants';

type MapFormInputCellProps = {
  index: string;
  objValue: { item: string; value: string };
  setObjValue: Dispatch<
    SetStateAction<{
      item: string;
      value: string;
    }>
  >;
};

export const MapFormInputCell = ({
  index,
  objValue,
  setObjValue,
}: MapFormInputCellProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [type, _] = name.split('-');
    setObjValue((prev) => ({ ...prev, [type]: value }));
  };
  return (
    <>
      <TableCell>
        <TextField
          fullWidth
          placeholder="item"
          name={`item-${index}`}
          size="small"
          sx={MapTBLTextFieldClass}
          value={objValue.item}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          placeholder="value"
          name={`value-${index}`}
          size="small"
          sx={MapTBLTextFieldClass}
          value={objValue.value}
          onChange={handleChange}
        />
      </TableCell>
    </>
  );
};
