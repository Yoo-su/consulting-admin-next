import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

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
export const updateConsultingRefNo = async (
  updateConsultingRefNoParams: UpdateConsultingRefNoParams
) => {
  return await apiInstance.post<UpdateConsultingRefNoResponse>(
    API_URLS.dashboard.updateConsultingRefNo,
    updateConsultingRefNoParams
  );
};
