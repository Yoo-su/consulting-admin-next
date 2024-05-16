import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { FoundationLibrary } from '../types/foundation-library.type';

export const GET_FOUNDATION_LIBRARIES_URL = (serviceID: string) =>
  `${apiUrls.dashboard.foundationLibrary}/${serviceID}`;

export const getFoundationLibraries = async (serviceID: string) => {
  return await apiInstance.get<FoundationLibrary[]>(GET_FOUNDATION_LIBRARIES_URL(serviceID));
};
