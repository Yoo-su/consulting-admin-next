'use client';

import { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
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

  useEffect(() => {
    if (currentUniv) {
      getServiceList(currentUniv.univID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUniv]);

  return (
    <Autocomplete
      disablePortal
      id="univ-select"
      options={univList}
      getOptionLabel={(option) => option.univName}
      isOptionEqualToValue={(option, value) => {
        return JSON.stringify(option) === JSON.stringify(value);
      }}
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
