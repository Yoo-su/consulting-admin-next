import { apiInstance } from "@/shared/plugin/axios";
export const signinUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/user/sign-in`;

export type SigninParams = {
  userID: string;
  password: string;
};
export type SigninResponse = {
  name: string;
  userID: string;
  role: "developer" | "manager";
  token: string;
};
export const signin = ({ userID, password }: SigninParams) => {
  return apiInstance.post<SigninResponse>(signinUrl, {
    userID,
    password,
  });
};
