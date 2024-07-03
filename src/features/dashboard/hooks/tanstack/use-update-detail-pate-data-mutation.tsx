import { useMutation } from '@tanstack/react-query';
import { updateDetailPageData } from '../../apis/update-detail-page-data';
import { DetailPageData } from '../../types/detail-page-data.type';

type MutationFnProps = {
  serviceID: string;
  detailpageData: DetailPageData[];
};
export const useUpdateDetailpageDataMutation = () => {
  return useMutation({
    mutationFn: ({ serviceID, detailpageData }: MutationFnProps) => updateDetailPageData(serviceID, detailpageData),
  });
};
