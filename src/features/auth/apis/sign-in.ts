import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export type SigninParams = {
  userID: string;
  userPassword: string;
};
export type SigninResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
export const signin = ({ userID, userPassword }: SigninParams) => {
  return apiInstance.post<SigninResponse>(apiUrls.user.signin, {
    userID,
    userPassword,
  });
};
