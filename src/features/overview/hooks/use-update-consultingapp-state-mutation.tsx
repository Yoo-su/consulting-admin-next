import { useMutation } from '@tanstack/react-query';
import { UpdateConsultingAppStateParams, updateConsultingAppState } from '../apis';

export const useUpdateConsultingAppStateMutation = () => {
  return useMutation({
    mutationFn: (params: UpdateConsultingAppStateParams) => updateConsultingAppState(params),
  });
};
