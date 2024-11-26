import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

export type CreateNewServiceResponse = {
  message: string;
  statusCode: number;
};

export type CreateNewServiceParams = {
  schoolYear: number;
  isSusi: string;
  univID: string;
};

export const createNewService = async (params: CreateNewServiceParams) => {
  const transformedParams = {
    SchoolYear: params.schoolYear,
    IsSusi: params.isSusi,
    UnivID: params.univID,
  };

  return await apiInstance.post<CreateNewServiceResponse>(
    API_URLS.dashboard.createService,
    transformedParams
  );
};
