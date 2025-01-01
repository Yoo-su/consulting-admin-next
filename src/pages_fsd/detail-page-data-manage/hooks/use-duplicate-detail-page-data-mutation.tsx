import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { duplicateDetailpageData } from '../apis';

type MutationFnProps = {
  sourceServiceID: string;
  targetServiceID: string;
};
export const useDuplicateDetailpageDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sourceServiceID, targetServiceID }: MutationFnProps) =>
      duplicateDetailpageData(sourceServiceID, targetServiceID),
    onSuccess: (data, variables) => {
      const serviceID = variables.targetServiceID as string;
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS['chart-setting']['chart-data'](serviceID).queryKey,
      });
    },
  });
};
