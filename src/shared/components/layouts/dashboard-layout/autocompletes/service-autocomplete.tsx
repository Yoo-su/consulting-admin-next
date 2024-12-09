'use client';

import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useCallback } from 'react';

import { useUnivService } from '@/shared/hooks';
import { Service } from '@/shared/models';

export const ServiceAutocomplete = () => {
  const {
    setCurrentService,
    serviceList,
    currentService,
    currentUniv,
    isServiceListLoading,
  } = useUnivService();

  const getServiceMenuTitle = useCallback((service: Service) => {
    return (
      service.schoolYear +
      '학년도' +
      ' ' +
      (service.isSusi === '1' ? '수시' : '정시') +
      ' ' +
      `(${service.serviceID})`
    );
  }, []);

  const handleChange = (event: any, newValue: Service | null) => {
    if (newValue) {
      setCurrentService(newValue);
    }
  };

  return (
    <Autocomplete
      size="small"
      disablePortal
      autoHighlight
      isOptionEqualToValue={(option, value) => {
        return option.serviceID === value.serviceID;
      }}
      id="service-select"
      options={serviceList}
      getOptionLabel={(option) => option.serviceID.toString()}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.serviceID}>
          {getServiceMenuTitle(option)}
        </Box>
      )}
      value={currentService || null}
      onChange={handleChange}
      disabled={!currentUniv}
      loading={isServiceListLoading}
      loadingText={
        <Stack direction={'row'} alignItems={'center'}>
          <CircularProgress size={18} sx={{ mr: 1.5 }} />
          <Typography variant="body1">불러오는 중입니다..</Typography>
        </Stack>
      }
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
          label={currentService ? currentService.serviceName : '서비스'}
          inputProps={{
            ...params.inputProps,
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
