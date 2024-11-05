import { apiInstance } from '../plugin/axios';
import { API_URLS } from '../constants';

export const deleteBrowserFile = async (path: string) => {
  const { data } = await apiInstance.post(API_URLS.dashboard.deleteBrowserFile, {
    fileName: path,
  });

  return data;
};
