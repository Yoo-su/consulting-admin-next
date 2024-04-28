import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ServiceSelect = () => {
  const [service, setService] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setService(event.target.value);
  };

  return (
    <FormControl sx={{ width: '100%' }} size='small'>
      <InputLabel id='demo-select-small-label'>Service</InputLabel>
      <Select
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={service}
        label='서비스'
        onChange={handleChange}
      >
        <MenuItem value={'999825'}>(999825) 2023학년도 수시</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ServiceSelect;
