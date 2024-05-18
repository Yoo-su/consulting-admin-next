import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { FoundationLibrary } from '../types/foundation-library.type';

type GetFoundationLibrariesResponse = {
  ServiceID: string;
  FileName: string;
  UploadDate: string;
  ModifyUser: string;
  url: string;
};

export const getFoundationLibraries = async (serviceID: string) => {
  return await apiInstance.get<FoundationLibrary[]>(`${apiUrls.dashboard.foundationLibrary}/${serviceID}`, {
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
