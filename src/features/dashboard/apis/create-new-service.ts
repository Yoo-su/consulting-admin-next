import { apiUrls } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

export type CreateNewServiceResponse = {
  message: string;
  statusCode: number;
};

export type CreateNewServiceParams = {
  SchoolYear: number;
  IsSusi: string;
  UnivID: string;
};

export const createNewService = async (params: CreateNewServiceParams) => {
  return await apiInstance.post<CreateNewServiceResponse>(apiUrls.dashboard.createService, params);
};
