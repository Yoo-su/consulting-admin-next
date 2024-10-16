'use client';

import { useState, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import toast from 'react-hot-toast';

import { useDuplicateDetailpageDataMutation } from '../hooks';
import { useConfirmToast } from '@/shared/hooks';
import { Service } from '@/shared/models';

type ServiceAutocompleteProps = {
  serviceID: string;
  serviceList: Service[];
};
const ServiceAutocomplete = ({ serviceID, serviceList }: ServiceAutocompleteProps) => {
  const { mutateAsync, isPending: isDuplicateDetailpageDataPending } = useDuplicateDetailpageDataMutation();
  const { openConfirmToast } = useConfirmToast();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getServiceMenuTitle = (service: Service) => {
    return (
      service.schoolYear + '학년도' + ' ' + (service.isSusi === '1' ? '수시' : '정시') + ' ' + `(${service.serviceID})`
    );
  };

  const handleChange = (event: SyntheticEvent<Element, Event>, service: Service | null) => {
    setSelectedService(service ?? null);
  };

  const handleClickDuplicateBtn = () => {
    if (selectedService)
      mutateAsync({ sourceServiceID: serviceID, targetServiceID: selectedService?.serviceID }).then(() => {
        toast.success(<Typography variant="body2">{selectedService.serviceID}에 성공적으로 복제되었습니다</Typography>);
      });
  };

  return (
    <Stack direction={'row'} spacing={1}>
      <Autocomplete
        sx={{ width: 260 }}
        size="small"
        disablePortal
        autoHighlight
        value={selectedService}
        options={serviceList.filter((item) => item.serviceID !== serviceID) ?? []}
        loadingText={
          <Stack direction={'row'} alignItems={'center'}>
            <CircularProgress size={18} sx={{ mr: 1.5 }} />
            <Typography variant="body1">불러오는 중입니다..</Typography>
          </Stack>
        }
        onChange={handleChange}
        getOptionLabel={(option) => getServiceMenuTitle(option)}
        isOptionEqualToValue={(option, value) => {
          return JSON.stringify(option) === JSON.stringify(value);
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.serviceID}>
            {getServiceMenuTitle(option)}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label={'대상 ServiceID'} />}
      />

      <LoadingButton
        variant="contained"
        size="small"
        color="success"
        loading={isDuplicateDetailpageDataPending}
        disabled={!selectedService}
        onClick={() => {
          openConfirmToast(
            `[${serviceID}] 서비스의 상세페이지 데이터를\n [${selectedService?.serviceID ?? ''}] 서비스에 복제합니다`,
            handleClickDuplicateBtn
          );
        }}
      >
        <Typography variant="body1">복제</Typography>
      </LoadingButton>
    </Stack>
  );
};

export default ServiceAutocomplete;
