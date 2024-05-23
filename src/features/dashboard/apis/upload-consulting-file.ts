import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { UploadFile } from '../types/consulting-file';

type UploadConsultingFileResponse = {
  statusCode: number;
  message?: string;
  errorMessage?: string;
};

export const uploadConsultingFile = async (uploadFile: UploadFile) => {
  const refinedFileInfo = {
    serviceID: uploadFile.ServiceID,
    file: uploadFile.File,
    RefTitle: uploadFile.RefTitle,
    userID: 'chess',
  };

  return await apiInstance.post<UploadConsultingFileResponse>(apiUrls.dashboard.uploadConsultingFile, refinedFileInfo, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
