import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { Service } from '../types/service.type';

type GetServiceListResponse = {
  ServiceID: string;
  SchoolYear: string;
  IsSusi: string;
  UnivID: string;
  ServiceName: string;
  Developer: string | null;
  Manager: string | null;
  SerialNo?: string | null;
  isNew?: boolean;
};

export const getServiceList = async (univID: string) => {
  return await apiInstance.get<Service[]>(`${apiUrls.admin.getServiceList}/${univID}`, {
    params: {
      univID,
    },
    transformResponse: (data) => {
      const parsedData = JSON.parse(data) as GetServiceListResponse[];
      return parsedData.map((item) => ({
        serviceID: item.ServiceID,
        schoolYear: item.SchoolYear,
        isSusi: item.IsSusi,
        univID: item.UnivID,
        serviceName: item.ServiceName,
        developer: item.Developer,
        manager: item.Manager,
        serialNo: item.SerialNo,
        isNew: item.isNew,
      }));
    },
  });
};
