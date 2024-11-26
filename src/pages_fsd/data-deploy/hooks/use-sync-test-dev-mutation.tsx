import { useMutation } from '@tanstack/react-query';

import { syncFromTestToDev } from '../apis';

export const useSyncTestDevMutation = () => {
  return useMutation({
    mutationFn: (serviceID: string) => syncFromTestToDev(serviceID),
  });
};
