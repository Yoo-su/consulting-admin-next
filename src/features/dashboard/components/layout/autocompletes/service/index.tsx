'use client';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import WidgetsIcon from '@mui/icons-material/Widgets';

import { useUnivService } from '@/features/dashboard/hooks/use-univ-service';
import { Service } from '@/features/dashboard/types/service.type';

const ServiceAutocomplete = () => {
  const { setCurrentService, serviceList, currentService, currentUniv } = useUnivService();

  const getServiceMenuTitle = (service: Service) => {
    return (
      service.schoolYear + '학년도' + ' ' + (service.isSusi === '1' ? '수시' : '정시') + ' ' + `(${service.serviceID})`
    );
  };

  const handleChange = (event: any, newValue: Service | null) => {
    if (newValue) {
      setCurrentService(newValue);
    }
  };

  return (
    <Autocomplete
      size="small"
      disablePortal
      id="service-select"
      options={serviceList}
      getOptionLabel={(option) => getServiceMenuTitle(option)}
      value={currentService || null}
      onChange={handleChange}
      disabled={!currentUniv}
      sx={{
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
          '&.Mui-disabled fieldset': {
            borderColor: '#FEF9F3', // disabled 상태일 때 테두리 색상 변경
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
          label="서비스"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <WidgetsIcon fontSize="small" sx={{ color: '#FEF9F3' }} />
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

export default ServiceAutocomplete;
