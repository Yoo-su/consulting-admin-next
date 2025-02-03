import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

export type UploadFoundationLibraryResponse = {
  statusCode: number;
  message?: string;
};
export const uploadFoundationLibrary = async (formData: FormData) => {
  return await apiInstance.post<UploadFoundationLibraryResponse>(API_URLS.dashboard.foundationLibrary, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
