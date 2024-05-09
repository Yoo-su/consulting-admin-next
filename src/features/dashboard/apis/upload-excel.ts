import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const UPLOAD_EXCEL_URL = process.env.NEXT_PUBLIC_BASE_URL + apiUrls.dashboard.uploadExcel;

type UploadExcelResponse = {
  success: boolean;
  message?: string;
};
export const uploadExcel = async (formData: FormData) => {
  return await apiInstance.post<UploadExcelResponse>(UPLOAD_EXCEL_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
