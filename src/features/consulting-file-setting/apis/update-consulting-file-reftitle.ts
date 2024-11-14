import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

type UpdateConsultingRefTitleResponse = {
  statusCode: number;
  message?: string;
  errorMessage?: string;
};
export type UpdateConsultingRefTitleParams = {
  ServiceID: number;
  RefNo: number;
  RefTitle: string;
};
export const updateConsultingRefTitle = async (updateConsultingRefTitleParams: UpdateConsultingRefTitleParams) => {
  return await apiInstance.post<UpdateConsultingRefTitleResponse>(
    API_URLS.dashboard.updateConsultingRefTitle,
    updateConsultingRefTitleParams
  );
};
