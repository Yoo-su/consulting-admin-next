import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { AppHistory } from '../types/app-history.type';

export const GET_APP_VERSION_HISTORY = (serviceID: string, osType: 'P' | 'A') =>
  apiUrls.dashboard.getAppVersionHistory + `/${serviceID}/${osType}`;

export const getAppVersionHistory = async (serviceID: string, osType: 'P' | 'A') => {
  return await apiInstance.get<AppHistory[]>(GET_APP_VERSION_HISTORY(serviceID, osType));
};
