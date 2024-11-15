import { API_URLS } from '@/shared/constants/api-urls';
import { authInstance } from '@/shared/plugin/axios';

export type GetConsultingFileDownloadParams = {
  serviceID: string;
  fileName: string;
};
export const getConsultingFileDownload = async ({
  serviceID,
  fileName,
}: GetConsultingFileDownloadParams) => {
  const { data } = await authInstance.get(
    `${API_URLS.dashboard.downloadConsultingFile}/${serviceID}/${fileName}`,
    {
      responseType: 'blob',
      headers: {
        Accept: 'application/pdf',
      },
    }
  );
  return data;
};
