import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';
import { ConsultingFile } from '../models';

export const getConsultingFileList = async (serviceID: string) => {
  return await apiInstance.get<ConsultingFile[]>(API_URLS.dashboard.getConsultingFileList + serviceID);
};
