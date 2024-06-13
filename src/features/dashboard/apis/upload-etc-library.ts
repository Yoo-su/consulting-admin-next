import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

type UploadEtcLibraryResponse = {
  statusCode: number;
  message?: string;
};
export const uploadEtcLibrary = async (formData: FormData) => {
  return await apiInstance.post<UploadEtcLibraryResponse>(apiUrls.dashboard.etcLibrary, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
