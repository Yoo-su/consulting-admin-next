import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { memo } from 'react';

type ModeSelectProps = {
  rowNum: number;
  currentMode: 'calc' | 'detail';
  handleModeChange: (rowNum: number, mode: 'calc' | 'detail') => void;
};
const ModeSelect = ({
  rowNum,
  currentMode,
  handleModeChange,
}: ModeSelectProps) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel sx={{ fontWeight: 'bold' }}>Mode</InputLabel>
      <Select
        value={currentMode}
        onChange={(event) => {
          handleModeChange(rowNum, event.target.value as 'calc' | 'detail');
        }}
        label="mode"
      >
        <MenuItem value="detail">detail</MenuItem>
        <MenuItem value="calc">calc</MenuItem>
      </Select>
    </FormControl>
  );
};

export default memo(ModeSelect);
