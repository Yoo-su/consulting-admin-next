import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const UPLOAD_FOUNDATION_LIBRARY_URL = apiUrls.dashboard.foundationLibrary;

type UploadFoundationLibraryResponse = {
  statusCode: number;
  message?: string;
};
export const uploadFoundationLibrary = async (formData: FormData) => {
  return await apiInstance.post<UploadFoundationLibraryResponse>(UPLOAD_FOUNDATION_LIBRARY_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
