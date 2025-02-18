'use client';

import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { memo, useCallback } from 'react';

import { COMPARISON_OPERATORS, DATA_TYPES } from '../../constants';
import { Condition, ConditionLogic } from '../../models';

type ConditionRowProps = {
  condition: Condition;
  handleChangeRowData: (idx: number, columnType: 'dataType' | 'eqValue' | 'value' | 'logic', newData: any) => void;
  handleClickDeleteRow: (idx: number) => void;
};
export const ConditionRow = ({ condition, handleChangeRowData, handleClickDeleteRow }: ConditionRowProps) => {
  const toggleConditionLogic = useCallback(() => {
    if (condition.logic === 'and') handleChangeRowData(condition.idx, 'logic', 'or');
    else handleChangeRowData(condition.idx, 'logic', 'and');
  }, [condition]);

  return (
    <Stack direction={'column'} width={'100%'}>
      {condition.logic && (
        <Stack direction={'row'} justifyContent={'center'} sx={{ my: 1.5 }}>
          <LogicButton logic={condition.logic} toggleConditionLogic={toggleConditionLogic} />
        </Stack>
      )}

      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Autocomplete
          size="small"
          defaultValue={condition.dataType}
          onChange={(event, newDataType) => handleChangeRowData(condition.idx, 'dataType', newDataType)}
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
          onChange={(event) => handleChangeRowData(condition.idx, 'value', event.target.value)}
          defaultValue={condition.value}
        />

        <IconButton aria-label="delete" size="small" onClick={() => handleClickDeleteRow(condition.idx)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

type LogicButtonProps = {
  logic: ConditionLogic;
  toggleConditionLogic: () => void;
};
const LogicButton = memo(({ logic, toggleConditionLogic }: LogicButtonProps) => {
  return (
    <Chip
      size="small"
      clickable
      onClick={toggleConditionLogic}
      label={<Typography fontWeight={'bold'}>{logic === 'and' ? 'AND' : 'OR'}</Typography>}
      sx={{
        bgcolor: logic === 'and' ? '#d18577' : '#81b1cd',
        color: '#fff',
        px: 2,
      }}
    />
  );
});
LogicButton.displayName = 'LogicButton';
