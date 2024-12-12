'use client';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FilterOptionsState } from '@mui/material/useAutocomplete/useAutocomplete';

import { useUnivService } from '@/shared/hooks';
import { Univ } from '@/shared/models';

export const UnivAutocomplete = () => {
  const { univList, setCurrentUniv, setCurrentService, currentUniv } =
    useUnivService();

  const handleChange = (event: any, newValue: Univ | null) => {
    if (newValue) {
      setCurrentService(null);
      setCurrentUniv(newValue);
    }
  };
  const filterOptions = (
    options: Univ[],
    { inputValue }: FilterOptionsState<Univ>
  ) => {
    return options.filter(
      (item) =>
        item.univName.includes(inputValue) ||
        item.univID.toString().includes(inputValue)
    );
  };
  return (
    <Autocomplete
      size="small"
      disablePortal
      isOptionEqualToValue={(option, value) => {
        return JSON.stringify(option) === JSON.stringify(value);
      }}
      id="univ-select"
      options={univList}
      getOptionLabel={(option) => option.univName}
      value={currentUniv || null}
      onChange={handleChange}
      filterOptions={filterOptions}
      sx={{
        my: 1.5,
        '& .MuiOutlinedInput-root': {
          color: '#FEF9F3',
          '& fieldset': {
            borderColor: '#FEF9F3',
          },
          '&:hover fieldset': {
            borderColor: '#FEF9F3',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FEF9F3',
          },
          '& .MuiSvgIcon-root': {
            color: '#FEF9F3', // 아이콘 색상
          },
        },
        '& .MuiAutocomplete-inputRoot': {
          color: '#FEF9F3',
        },
        '& .MuiAutocomplete-option': {
          color: '#FEF9F3',
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="대학교"
          InputLabelProps={{
            style: {
              color: '#FEF9F3',
            },
          }}
        />
      )}
    />
  );
};
