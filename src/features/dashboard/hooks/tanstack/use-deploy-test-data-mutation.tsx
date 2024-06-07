'use client';

import { useMutation } from '@tanstack/react-query';
import { deployTestData } from '../../apis/deploy-test-data';

export const useDeployTestDataMutation = () => {
  return useMutation({
    mutationKey: ['deploy-test-data'],
    mutationFn: (serviceID: string) => deployTestData(serviceID),
  });
};
