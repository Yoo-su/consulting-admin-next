import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

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
  console.log('deleteConsultingFileParams:', deleteConsultingFileParams);
  return await apiInstance.post<DeleteConsultingFileResponse>(
    apiUrls.dashboard.deleteConsultingFile,
    deleteConsultingFileParams
  );
};
