import { apiInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';

export type UpdateIsNewParams = {
  serviceID: number;
  isNew: boolean;
};
export const updateServiceIsNew = async (updateIsNewParams: UpdateIsNewParams) => {
  return await apiInstance.post(API_URLS.dashboard.updateIsNew, updateIsNewParams);
};
