import { useMutation, useQueryClient } from '@tanstack/react-query';
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
      queryClient.invalidateQueries({
        queryKey: ['detail-page-data', variables.targetServiceID],
      });
    },
  });
};
