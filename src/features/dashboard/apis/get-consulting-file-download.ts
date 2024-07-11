import { authInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export type GetConsultingFileDownloadParams = {
  serviceID: string;
  fileName: string;
};
export const getConsultingFileDownload = async ({ serviceID, fileName }: GetConsultingFileDownloadParams) => {
  const { data } = await authInstance.get(`${apiUrls.dashboard.downloadConsultingFile}/${serviceID}/${fileName}`, {
    responseType: 'blob',
    headers: {
      Accept: 'application/pdf',
    },
  });
  return data;
};
