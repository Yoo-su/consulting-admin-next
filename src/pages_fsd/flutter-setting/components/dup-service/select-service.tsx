import { Autocomplete, TextField, Typography } from '@mui/material';
import { HTMLAttributes, Key, SyntheticEvent, useState } from 'react';

import { useUnivService } from '@/shared/hooks';

import { ServiceOption } from '../../constants';

type SelectServiceProps = {
  selectedService: ServiceOption | null;
  setselectedService: (value: ServiceOption | null) => void;
};
export const SelectService = ({
  selectedService,
  setselectedService,
}: SelectServiceProps) => {
  const { serviceList, currentService } = useUnivService();
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: ServiceOption | null
  ) => {
    setselectedService(value ?? null);
  };

  const handleInputChange = (
    _: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };
  const options = serviceList.map((service) => {
    return {
      serviceYear: service.schoolYear + '학년도',
      isSusi: service.isSusi,
      schoolYear: service.schoolYear,
      serviceID: service.serviceID,
      serviceName: service.serviceName,
    };
  });

  return (
    <Autocomplete<ServiceOption, false, false, false>
      size="small"
      value={selectedService}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options.sort(
        (a, b) => Number(b.schoolYear) - Number(a.schoolYear)
      )}
      groupBy={(option) => option.serviceYear}
      getOptionLabel={(option) =>
        `${option.isSusi === '1' ? '수시' : '정시'} ` + option.serviceID
      }
      getOptionDisabled={(option) =>
        option.serviceID === currentService?.serviceID
      }
      renderOption={(
        props: HTMLAttributes<HTMLLIElement> & { key?: Key },
        option
      ) => {
        const { key, ...rest } = props;
        return (
          <li
            key={key}
            {...rest}
            style={{
              paddingLeft: option.serviceID ? '5rem' : '0',
              display: 'flex',
              gap: 5,
            }}
          >
            <Typography variant="caption" sx={{ paddingTop: '2px' }}>
              {option.isSusi === '1' ? '수시' : '정시'}
            </Typography>
            {option.serviceID}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="서비스ID" />}
      isOptionEqualToValue={(option, value) =>
        option.serviceID === value.serviceID
      }
    />
  );
};
