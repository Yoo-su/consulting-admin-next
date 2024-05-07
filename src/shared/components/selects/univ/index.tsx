'use client';

import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useUnivService } from '@/shared/hooks/use-univ-service';
import { useGetServiceList } from '@/shared/hooks/use-get-service-list';

const UnivSelect = () => {
  const { univList, setCurrentUniv } = useUnivService();
  const [selectUnivID, setSelectUnivID] = useState<string>('');
  const { execute } = useGetServiceList();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedUnivID = event.target.value;
    setSelectUnivID(selectedUnivID);
    const selectedUniv = univList.find((univ) => univ.univID === selectedUnivID);
    if (selectedUniv) {
      setCurrentUniv(selectedUniv);
      execute(selectedUnivID);
    }
  };

  return (
    <FormControl sx={{ minWidth: '100%', maxWidth: '100%', my: 1.5 }} size="small">
      <InputLabel id="demo-select-small-label">Univ</InputLabel>
      <Select labelId="univ-select" id="univ-select" value={selectUnivID} label="대학" onChange={handleChange}>
        {univList.map((univ) => (
          <MenuItem key={univ.univID} value={univ.univID}>
            {univ.univName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UnivSelect;
