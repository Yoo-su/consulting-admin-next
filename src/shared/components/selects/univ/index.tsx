'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useUnivService } from '@/shared/hooks/use-univ-service';
import { useGetServiceList } from '@/shared/hooks/use-get-service-list';

const UnivSelect = () => {
  const { univList, setCurrentUniv, setCurrentService, currentUniv } = useUnivService();
  const { execute } = useGetServiceList();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedUnivID = event.target.value;
    const selectedUniv = univList.find((univ) => univ.univID === selectedUnivID);
    if (selectedUniv) {
      setCurrentUniv(selectedUniv);
      setCurrentService(null);
      execute(selectedUnivID);
    }
  };

  return (
    <FormControl sx={{ minWidth: '100%', maxWidth: '100%', my: 1.5 }} size="small">
      <InputLabel
        id="univ-select-input-label"
        sx={{
          color: '#FEF9F3',
          '&.Mui-focused': {
            color: '#FEF9F3',
          },
        }}
      >
        대학교
      </InputLabel>
      <Select
        labelId="univ-select"
        id="univ-select"
        value={currentUniv?.univID ?? ''}
        label="대학교"
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FEF9F3',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FEF9F3',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FEF9F3',
          },
          '& .MuiSvgIcon-root': {
            color: '#FEF9F3', // 아이콘 색상
          },
          '&.MuiInputLabel-outlined': {
            color: '#FEF9F3',
          },
          '& .MuiInputLabel-root': {
            color: '#FEF9F3',
          },
          color: '#FEF9F3',
        }}
      >
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
