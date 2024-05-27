import { authInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const getUserProfile = async () => {
  return await authInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL + apiUrls.user.profile}`);
};
