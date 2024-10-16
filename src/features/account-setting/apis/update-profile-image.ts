import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

export type UpdateProfileImageResponse = {
  imagePath: string;
};

export const updateProfileImage = async (formData: FormData) => {
  return await apiInstance.post<UpdateProfileImageResponse>(API_URLS.user.updateProfileImage, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
