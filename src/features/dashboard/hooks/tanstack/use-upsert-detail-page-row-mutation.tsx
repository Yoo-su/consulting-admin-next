import { useMutation } from '@tanstack/react-query';
import { upsertDetailPageRow } from '../../apis/upsert-detail-page-row';
import { DetailPageData } from '../../types/detail-page-data.type';

type MutationFnProps = {
  serviceID: string;
  detailpageRow: DetailPageData;
};
export const useUpsertDetailpageRowMutation = () => {
  return useMutation({
    mutationFn: ({ serviceID, detailpageRow }: MutationFnProps) => upsertDetailPageRow(serviceID, detailpageRow),
  });
};
