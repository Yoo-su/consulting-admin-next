import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { memo } from 'react';

type ModeSelectProps = {
  rowNumber: number;
  currentMode: 'calc' | 'detail';
  handleModeChange: (rowNumber: number, mode: 'calc' | 'detail') => void;
};
export const ModeSelect = memo(
  ({ rowNumber, currentMode, handleModeChange }: ModeSelectProps) => {
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel sx={{ fontWeight: 'bold' }}>Mode</InputLabel>
        <Select
          value={currentMode}
          onChange={(event) =>
            handleModeChange(rowNumber, event.target.value as 'calc' | 'detail')
          }
          label="mode"
        >
          <MenuItem value="detail">detail</MenuItem>
          <MenuItem value="calc">calc</MenuItem>
        </Select>
      </FormControl>
    );
  }
);
ModeSelect.displayName = 'ModeSelect';
