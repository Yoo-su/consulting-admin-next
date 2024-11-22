import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { createCalcConfig } from '../apis';

export const useCreateCalcConfigMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (serviceID: string) => createCalcConfig(serviceID),
    onSuccess: (variables) => {
      console.log(variables);
      /* queryClient.invalidateQueries({
        //queryKey: QUERY_KEYS['calculation-setting']['calc-config']().queryKey
      }); */
    },
  });
};
