import { apiInstance } from '../plugin/axios';
import { API_URLS } from '../constants';

export const downloadBrowsedFile = async (path: string) => {
  const encoded = encodeURIComponent(decodeURIComponent(path));

  return await apiInstance.get(`${API_URLS.dashboard.downloadBrowsedFile}/${encoded}`);
};
