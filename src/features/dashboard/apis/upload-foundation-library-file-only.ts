import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

type UploadFoundationLibraryResponse = {
  statusCode: number;
  message?: string;
};
export const uploadFoundationLibraryFileOnly = async (formData: FormData) => {
  return await apiInstance.post<UploadFoundationLibraryResponse>(
    apiUrls.dashboard.foundationLibraryFileOnly,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
