import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { UploadFile } from '../models';

type UploadConsultingFileResponse = {
  statusCode: number;
  message?: string;
  errorMessage?: string;
};

export const uploadConsultingFile = async (
  uploadFile: UploadFile,
  userID: string
) => {
  const refinedFileInfo = {
    serviceID: uploadFile.ServiceID,
    file: uploadFile.File,
    RefTitle: uploadFile.RefTitle,
    userID,
  };
  return await apiInstance.post<UploadConsultingFileResponse>(
    API_URLS.dashboard.uploadConsultingFile,
    refinedFileInfo,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
