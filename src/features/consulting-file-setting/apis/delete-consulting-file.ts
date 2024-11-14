import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

type DeleteConsultingFileResponse = {
  statusCode: number;
  message?: string;
  errorMessage?: string;
};
export type DeleteConsultingFileParams = {
  ServiceID: number;
  RefNo: number;
};
export const deleteConsultingFile = async (deleteConsultingFileParams: DeleteConsultingFileParams) => {
  return await apiInstance.post<DeleteConsultingFileResponse>(
    API_URLS.dashboard.deleteConsultingFile,
    deleteConsultingFileParams
  );
};
