import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

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
