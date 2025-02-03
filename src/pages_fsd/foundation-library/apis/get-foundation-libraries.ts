import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

import { FoundationLibrary } from '../models';

type GetFoundationLibrariesResponse = {
  ServiceID: string;
  FileName: string;
  UploadDate: string;
  ModifyUser: string;
  url: string;
};

export const getFoundationLibraries = async (serviceID: string) => {
  return await apiInstance.get<FoundationLibrary[]>(`${API_URLS.dashboard.foundationLibrary}/${serviceID}`, {
    transformResponse: (data) => {
      const parsedData = JSON.parse(data) as GetFoundationLibrariesResponse[];
      return parsedData.map((item) => ({
        serviceID: item.ServiceID,
        fileName: item.FileName,
        uploadDate: item.UploadDate,
        modifyUser: item.ModifyUser,
        url: item.url,
      }));
    },
  });
};
