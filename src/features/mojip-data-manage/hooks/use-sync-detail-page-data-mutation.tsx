import { useMutation } from '@tanstack/react-query';
import { syncDetailpageData } from '../apis';

type Server = 'devDb' | 'testDb' | 'realDb';
type MutationFnProps = {
  serviceID: string;
  sourceServerType: Server;
  targetServerType: Server;
};
export const useSyncDetailpageDataMutation = () => {
  return useMutation({
    mutationFn: ({ serviceID, sourceServerType, targetServerType }: MutationFnProps) =>
      syncDetailpageData(serviceID, sourceServerType, targetServerType),
  });
};
