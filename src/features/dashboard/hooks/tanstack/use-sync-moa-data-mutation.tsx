import { useMutation } from '@tanstack/react-query';
import { SyncMoaNesinServiceParams, syncMoaNesinService } from '../../apis/sync-moa-nesin-service';

export const useSyncMoaDataMutation = () => {
  return useMutation({
    mutationFn: (params: SyncMoaNesinServiceParams) => {
      return syncMoaNesinService(params);
    },
  });
};
