'use client';

import styled from '@mui/material/styles/styled';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useUnivService } from '@/shared/hooks/use-univ-service';
import { useGetServiceList } from '@/shared/hooks/use-get-service-list';

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FEF9F3', // 테두리 색상
    },
    '&:hover fieldset': {
      borderColor: '#FEF9F3', // 마우스 오버 시 테두리 색상
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FEF9F3', // 포커스 시 테두리 색상
    },
  },
  '& .MuiSelect-select': {
    color: '#FEF9F3', // 글자 색상
  },
  '& .MuiSvgIcon-root': {
    color: '#FEF9F3', // 아이콘 색상
  },
}));

const UnivSelect = () => {
  const { univList, setCurrentUniv, currentUniv } = useUnivService();
  const { execute } = useGetServiceList();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedUnivID = event.target.value;
    const selectedUniv = univList.find((univ) => univ.univID === selectedUnivID);
    if (selectedUniv) {
      setCurrentUniv(selectedUniv);
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
