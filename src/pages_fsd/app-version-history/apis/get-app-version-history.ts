import { AppHistory, OsTypeValues } from '@/pages_fsd/app-version-history/models';
import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

export type GetAppVersionHistoryResponse = {
  ServiceID: string;
  OsType: Exclude<OsTypeValues, 'O'>;
  Version: number;
  PackageFileName: string | null;
  ProvisionFileName: string | null;
  ReleaseNote: string | null;
  UploadTime: string;
  ManualFileName: string | null;
};

export const getAppVersionHistory = async (serviceID: string, osType: Exclude<OsTypeValues, 'O'>) => {
  return await apiInstance.get<AppHistory[]>(`${API_URLS.dashboard.getAppVersionHistory}/${serviceID}/${osType}`, {
    transformResponse: (data) => {
      const parsedData = JSON.parse(data) as GetAppVersionHistoryResponse[];
      return parsedData.map((item) => ({
        serviceID: item.ServiceID,
        osType: item.OsType,
        version: item.Version,
        packageFileName: item.PackageFileName,
        provisionFileName: item.ProvisionFileName,
        releaseNote: item.ReleaseNote,
        uploadTime: item.UploadTime,
        manualFileName: item.ManualFileName,
      }));
    },
  });
};
