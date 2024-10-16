import { authInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

export const getUserProfile = async () => {
  return await authInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL + API_URLS.user.profile}`);
};
