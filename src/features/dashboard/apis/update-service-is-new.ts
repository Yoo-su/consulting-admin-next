import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export type UpdateIsNewParams = {
  serviceID: number;
  isNew: boolean;
};
export const updateServiceIsNew = async (updateIsNewParams: UpdateIsNewParams) => {
  return await apiInstance.post(apiUrls.dashboard.updateIsNew, updateIsNewParams);
};
