import { useMutation } from '@tanstack/react-query';
import { updateDetailPageData } from '../apis';
import { DetailPageData } from '../models';

type MutationFnProps = {
  serviceID: string;
  detailpageData: DetailPageData[];
};
export const useUpdateDetailpageDataMutation = () => {
  return useMutation({
    mutationFn: ({ serviceID, detailpageData }: MutationFnProps) => updateDetailPageData(serviceID, detailpageData),
  });
};
