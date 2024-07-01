import { useMutation } from '@tanstack/react-query';
import { updateDetailPageData } from '../../apis/update-detail-page-data';
import { DetailPageData } from '../../types/detail-page-data.type';

type MutationFnProps = {
  serviceID: string;
  detailpageDatas: DetailPageData[];
};
export const useUpdateDetailpageDataMutation = () => {
  return useMutation({
    mutationFn: ({ serviceID, detailpageDatas }: MutationFnProps) => updateDetailPageData(serviceID, detailpageDatas),
  });
};
