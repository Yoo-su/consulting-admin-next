import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

type UpdateConsultingRefNoResponse = {
  statusCode: number;
  message?: string;
  errorMessage?: string;
};
export type UpdateConsultingRefNoParams = {
  ServiceID: number;
  oldRefNo: number;
  newRefNo: number;
};
export const updateConsultingRefNo = async (updateConsultingRefNoParams: UpdateConsultingRefNoParams) => {
  return await apiInstance.post<UpdateConsultingRefNoResponse>(
    apiUrls.dashboard.updateConsultingRefNo,
    updateConsultingRefNoParams
  );
};
