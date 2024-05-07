import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useUnivService } from '@/shared/hooks/use-univ-service';
import { Service } from '@/shared/types/service.type';

const ServiceSelect = () => {
  const { setCurrentService, serviceList } = useUnivService();
  const [selectServiceID, setSelectServiceID] = useState<string>('');

  const getServiceMenuTitle = (service: Service) => {
    return (
      service.serviceYear +
      '학년도' +
      ' ' +
      (service.serviceType === 'susi' ? '수시' : '정시') +
      ' ' +
      `(${service.serviceID})`
    );
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedServiceID = event.target.value;
    setSelectServiceID(selectedServiceID);
    const selectedService = serviceList.find((service) => service.serviceID === selectedServiceID);
    if (selectedService) {
      setCurrentService(selectedService);
    }
  };

  return (
    <FormControl
      sx={{
        minWidth: '100%',
        maxWidth: '100%',
      }}
      size="small"
    >
      <InputLabel id="demo-select-small-label">Service</InputLabel>
      <Select labelId="service-select" id="service-select" value={selectServiceID} label="대학" onChange={handleChange}>
        {serviceList.map((service) => (
          <MenuItem key={service.serviceID} value={service.serviceID}>
            {getServiceMenuTitle(service)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ServiceSelect;
