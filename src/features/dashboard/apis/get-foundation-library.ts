import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const GET_FOUNDATION_LIBRARY_URL = (serviceID: string) => apiUrls.dashboard.foundationLibrary + `/${serviceID}`;

export const getFoundationLibrary = async (serviceID: string) => {
  return await apiInstance.get(GET_FOUNDATION_LIBRARY_URL(serviceID));
};
