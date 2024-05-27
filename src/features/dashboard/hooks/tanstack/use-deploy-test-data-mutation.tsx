'use client';

import { useMutation } from '@tanstack/react-query';
import { deployTestData } from '../../apis/deploy-test-data';

export const useDeployTestDataMutation = (serviceID: string) => {
  return useMutation({
    mutationKey: ['deploy-test-data', serviceID],
    mutationFn: () => deployTestData(serviceID),
  });
};
