import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

type UploadFoundationLibraryResponse = {
  statusCode: number;
  message?: string;
};
export const uploadFoundationLibraryFileOnly = async (formData: FormData) => {
  return await apiInstance.post<UploadFoundationLibraryResponse>(
    API_URLS.dashboard.foundationLibraryFileOnly,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
