import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';

type Server = 'devDb' | 'testDb' | 'realDb';
export const syncDetailpageData = async (serviceID: string, sourceServerType: Server, targetServerType: Server) => {
  return await apiInstance.post(`${apiUrls.dashboard.syncDetailpage}/${serviceID}`, {
    sourceServerType,
    targetServerType,
  });
};
