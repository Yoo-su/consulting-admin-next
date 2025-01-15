import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { getCurrentServiceYear } from '@/shared/services';

import { useServiceListMutation } from '../../hooks';
import { ServiceTypeNum } from '../../constants';
import { InputServiceYear } from './input-service-year';
import { InputServiceType } from './input-service-type';
import { AddFormButton } from './add-form-button';

export const AddServiceForm = ({ univID }: { univID: string }) => {
  const { addService, isAddServiceLoading } = useServiceListMutation();
  const [serviceType, setServiceType] = useState<ServiceTypeNum>(
    ServiceTypeNum.SUSI
  );
  const currentServiceYear = getCurrentServiceYear();

  const handleSubmit = () => {
    addService({
      schoolYear: currentServiceYear,
      isSusi: serviceType,
      univID: univID,
    });
  };

  return (
    <Paper sx={{ padding: '1rem' }}>
      <Stack
        direction={'row'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
      >
        <InputServiceYear currentServiceYear={currentServiceYear} />
        <InputServiceType
          serviceType={serviceType}
          setServiceType={setServiceType}
        />
        <AddFormButton
          handleSubmit={handleSubmit}
          isAddServiceLoading={isAddServiceLoading}
        />
      </Stack>
    </Paper>
  );
};
