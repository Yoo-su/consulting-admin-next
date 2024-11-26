import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

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
  return apiInstance.post<SigninResponse>(API_URLS.user.signin, {
    userID,
    userPassword,
  });
};
