import { Autocomplete, TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

import { useGetServiceListQuery } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { ServiceOption } from '../../models';
import {
  getOptionDisabled,
  getOptionLabel,
  getRenderOption,
  isOptionEqualToValue,
} from '../../services';

type SelectServiceProps = {
  selectedService: ServiceOption | null;
  setSelectedService: (value: ServiceOption | null) => void;
};
export const SelectService = ({
  selectedService,
  setSelectedService,
}: SelectServiceProps) => {
  const { currentUniv, currentService } = useSharedStore();
  const { serviceID } = currentService ?? {};
  const { data: serviceList } = useGetServiceListQuery(currentUniv?.univID);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: ServiceOption | null
  ) => {
    setSelectedService(value ?? null);
  };

  const handleInputChange = (
    _: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };
  const defaultOptions =
    serviceList?.map((service) => ({
      serviceYear: service.schoolYear + '학년도',
      isSusi: service.isSusi,
      schoolYear: service.schoolYear,
      serviceID: service.serviceID,
      serviceName: service.serviceName,
    })) ?? [];

  const options = defaultOptions.sort(
    (a, b) => Number(b.schoolYear) - Number(a.schoolYear)
  );

  return (
    <Autocomplete<ServiceOption, false, false, false>
      size="small"
      value={selectedService}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options}
      groupBy={(option) => option.serviceYear}
      getOptionLabel={(option) => getOptionLabel(option)}
      getOptionDisabled={(option) => getOptionDisabled(option, serviceID)}
      renderOption={(props, option) => getRenderOption(props, option)}
      renderInput={(params) => <TextField {...params} label="서비스ID" />}
      isOptionEqualToValue={(option, value) =>
        isOptionEqualToValue(option, value)
      }
    />
  );
};
