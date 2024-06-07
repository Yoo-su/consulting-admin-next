import { useMutation } from '@tanstack/react-query';
import { syncFromTestToDev } from '../../apis/sync-test-dev';

export const useSyncTestDevMutation = () => {
  return useMutation({
    mutationFn: (serviceID: string) => syncFromTestToDev(serviceID),
  });
};
