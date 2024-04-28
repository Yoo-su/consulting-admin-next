import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const UnivSelect = () => {
  const [univ, setUniv] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setUniv(event.target.value);
  };

  return (
    <FormControl sx={{ width: '100%', my: 1.5 }} size='small'>
      <InputLabel id='demo-select-small-label'>Univ</InputLabel>
      <Select
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={univ}
        label='대학'
        onChange={handleChange}
      >
        <MenuItem value={'진학대학교'}>진학대학교</MenuItem>
      </Select>
    </FormControl>
  );
};

export default UnivSelect;
