import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const createCalcConfig = async (serviceID: string) => {
  const { data } = await apiInstance.post(
    API_URLS.dashboard.createCalcConfig(serviceID),
    {
      HSBCalcCaseNo: 1,
      SATCalcCaseNo: null,
      Description: `${serviceID}서비스 새 Config`,
      CalcMethodID: 2,
    }
  );
  return data;
};
