'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useUnivService } from '@/shared/hooks/use-univ-service';

const UnivSelect = () => {
  const { univList, setCurrentUniv, currentUniv } = useUnivService();

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentUniv(JSON.parse(event.target.value));
  };

  return (
    <FormControl sx={{ width: '100%', my: 1.5 }} size="small">
      <InputLabel id="demo-select-small-label">Univ</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={currentUniv?.univName}
        label="대학"
        onChange={handleChange}
      >
        {univList.map((univ) => (
          <MenuItem key={univ.univID} value={JSON.stringify(univ)}>
            {univ.univName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UnivSelect;
