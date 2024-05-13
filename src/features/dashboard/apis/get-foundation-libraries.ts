import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const GET_FOUNDATION_LIBRARIES_URL = (serviceID: string) =>
  `${apiUrls.dashboard.foundationLibrary}/${serviceID}`;

export type FoundationLibrary = {
  ServiceID: string;
  FileName: string;
  UploadDate: string;
  ModifyUser: string;
  url: string;
};
export const getFoundationLibraries = async (serviceID: string) => {
  return await apiInstance.get<FoundationLibrary[]>(GET_FOUNDATION_LIBRARIES_URL(serviceID));
};
