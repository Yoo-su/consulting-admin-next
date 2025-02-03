import { API_URLS } from '@/shared/constants/api-urls';
import { apiInstance } from '@/shared/plugin/axios';

type Server = 'devDb' | 'testDb' | 'realDb';
export const syncDetailpageData = async (serviceID: string, sourceServerType: Server, targetServerType: Server) => {
  return await apiInstance.post(`${API_URLS.dashboard.syncDetailpage}/${serviceID}`, {
    sourceServerType,
    targetServerType,
  });
};
