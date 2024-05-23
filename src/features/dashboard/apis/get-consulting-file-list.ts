import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { ConsultingFile } from '../types/consulting-file';

export const getConsultingFileList = async (serviceID: string) => {
  return await apiInstance.get<ConsultingFile[]>(apiUrls.dashboard.getConsultingFileList + serviceID);
};
