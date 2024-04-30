import { apiInstance } from '@/shared/plugin/axios';

type SigninParams = {
  userID: string;
  password: string;
};
export const signin = async ({ userID, password }: SigninParams) => {
  await apiInstance.post('user/signin');
};
