import { useMutation } from '@tanstack/react-query';
import { updateConsultingAppState } from '../../apis/update-consultingapp-state';
import { ConsultingAppState } from '../../types/consultingapp-state.type';
import { toast } from 'react-hot-toast';

export const useUpdateConsultingAppStateMutation = () => {
  return useMutation({
    mutationFn: (state: ConsultingAppState) => updateConsultingAppState(state),
  });
};
