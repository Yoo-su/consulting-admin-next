import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { EtcLibrary } from '../types/etc-library.type';

type GetEtcLibraryResponse = {
  ServiceID: string;
  FileName: string;
  UploadDate: string;
  ModifyUser: string;
  url: string;
};

const transformEtcLibraryResponse = (data: GetEtcLibraryResponse[]): EtcLibrary[] => {
  if (!Array.isArray(data)) {
    throw new Error('데이터가 올바르지 않습니다.');
  }

  return data.map((item) => {
    if (
      typeof item === 'object' &&
      item !== null &&
      'ServiceID' in item &&
      'FileName' in item &&
      'UploadDate' in item &&
      'ModifyUser' in item &&
      'url' in item
    ) {
      return {
        serviceID: item.ServiceID,
        fileName: item.FileName,
        uploadDate: item.UploadDate,
        modifyUser: item.ModifyUser,
        url: item.url,
      };
    }
    throw new Error('데이터가 올바르지 않습니다.');
  });
};

export const getEtcLibrary = async (serviceID: string) => {
  return await apiInstance.get<EtcLibrary[]>(`${apiUrls.dashboard.etcLibrary}/${serviceID}`, {
    transformResponse: (data) => {
      return transformEtcLibraryResponse(JSON.parse(data));
    },
  });
};
