import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

type UploadFoundationLibraryResponse = {
  statusCode: number;
  message?: string;
};
export const uploadFoundationLibrary = async (formData: FormData) => {
  return await apiInstance.post<UploadFoundationLibraryResponse>(apiUrls.dashboard.foundationLibrary, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
