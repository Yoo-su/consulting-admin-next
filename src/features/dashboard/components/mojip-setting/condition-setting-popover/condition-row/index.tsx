'use client';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/DeleteOutline';

import { COMPARISON_OPERATORS, DATA_TYPES } from '../../constants';

import { Condition } from '../../types/condition.type';

type ConditionRowProps = {
  condition: Condition;
  handleChangeRowData: (idx: number, columnType: 'dataType' | 'eqValue' | 'value' | 'logic', newData: any) => void;
  handleClickDeleteRowBtn: (idx: number) => void;
};
const ConditionRow = ({ condition, handleChangeRowData, handleClickDeleteRowBtn }: ConditionRowProps) => {
  const toggleConditionLogic = () => {
    if (condition.logic === 'and') handleChangeRowData(condition.idx, 'logic', 'or');
    else handleChangeRowData(condition.idx, 'logic', 'and');
  };

  return (
    <Stack direction={'column'}>
      {condition.logic && (
        <Stack direction={'row'} justifyContent={'center'} sx={{ my: 1.5 }}>
          <Chip
            size="small"
            clickable
            onClick={toggleConditionLogic}
            label={<Typography fontWeight={'bold'}>{condition.logic === 'and' ? 'AND' : 'OR'}</Typography>}
            sx={{
              bgcolor: condition.logic === 'and' ? '#d18577' : '#81b1cd',
              color: '#fff',
              px: 2,
            }}
          />
        </Stack>
      )}

      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Autocomplete
          size="small"
          defaultValue={condition.dataType}
          onChange={(event, newDataType) => {
            handleChangeRowData(condition.idx, 'dataType', newDataType);
          }}
          options={DATA_TYPES}
          renderInput={(params) => <TextField {...params} label="조건" />}
          sx={{ flexGrow: 2 }}
        />

        <FormControl size="small">
          <InputLabel>연산자</InputLabel>
          <Select
            sx={{ width: '80px' }}
            label={'연산자'}
            value={condition.eqValue}
            onChange={(event) => {
              handleChangeRowData(condition.idx, 'eqValue', event.target.value);
            }}
          >
            {Object.entries(COMPARISON_OPERATORS).map((item) => (
              <MenuItem key={item[0]} value={item[0]}>
                {item[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="값"
          sx={{ width: '80px', flexGrow: 1 }}
          inputProps={{ style: { width: 'fit-content' } }}
          size="small"
          onChange={(event) => {
            handleChangeRowData(condition.idx, 'value', event.target.value);
          }}
          defaultValue={condition.value}
        />

        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            handleClickDeleteRowBtn(condition.idx);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ConditionRow;
