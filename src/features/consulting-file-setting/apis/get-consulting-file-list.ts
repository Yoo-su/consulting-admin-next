import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { ConsultingFile } from '../models';

export const getConsultingFileList = async (serviceID: string) => {
  return await apiInstance.get<ConsultingFile[]>(
    API_URLS.dashboard.getConsultingFileList + serviceID
  );
};
