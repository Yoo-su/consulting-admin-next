import { Button, Stack, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { MapTBLRowBorderClass } from '../../constants';
import { UseMapFormReturn } from '../../hooks';
import { MapFormInputCell } from './map-form-input-cell';

type MapFormAddCancelButtonProps = {
  mapHookValues: UseMapFormReturn;
};

export const MapFormAddCancelButton = ({ mapHookValues }: MapFormAddCancelButtonProps) => {
  const { isAdd, handleCancel, objValue, setObjValue, handleConfirm, isDisabled } = mapHookValues;

  if (!isAdd || isDisabled) return null;
  return (
    <TableRow sx={MapTBLRowBorderClass}>
      <MapFormInputCell index="new" objValue={objValue} setObjValue={setObjValue} />
      <TableCell>
        <Stack direction={'row'} spacing={1}>
          <Button
            onClick={handleConfirm}
            variant="contained"
            size="small"
            id={`confirmID-new`}
            disableElevation
            disabled={!(objValue.value && objValue.item)}
          >
            <Typography variant="caption">등록</Typography>
          </Button>
          <Button onClick={handleCancel} color="error" variant="outlined" size="small">
            <Typography variant="caption">취소</Typography>
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
