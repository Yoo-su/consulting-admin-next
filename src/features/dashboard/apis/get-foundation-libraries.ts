import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

export const GET_FOUNDATION_LIBRARIES_URL = (serviceID: number) =>
  `${apiUrls.dashboard.foundationLibrary}/${serviceID}`;

export type FoundationLibrary = {
  ServiceID: number;
  FileName: string;
  UploadDate: string;
  ModifyUser: string;
  url: string;
};
export const getFoundationLibraries = async (serviceID: number) => {
  return await apiInstance.get<FoundationLibrary[]>(GET_FOUNDATION_LIBRARIES_URL(serviceID));
};
