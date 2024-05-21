'use client';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { useUnivService } from '@/features/dashboard/hooks/use-univ-service';
import { useGetServiceList } from '@/features/dashboard/hooks/use-get-service-list';
import { Univ } from '@/features/dashboard/types/univ.type';

const UnivAutocomplete = () => {
  const { univList, setCurrentUniv, setCurrentService, currentUniv } = useUnivService();
  const { execute: getServiceList } = useGetServiceList();

  const handleChange = (event: any, newValue: Univ | null) => {
    if (newValue) {
      setCurrentService(null);
      setCurrentUniv(newValue);
      getServiceList(newValue.univID);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="univ-select"
      options={univList}
      getOptionLabel={(option) => option.univName}
      value={currentUniv || null}
      onChange={handleChange}
      size="small"
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
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceIcon fontSize="small" sx={{ color: '#FEF9F3' }} />
              </InputAdornment>
            ),
          }}
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

export default UnivAutocomplete;
