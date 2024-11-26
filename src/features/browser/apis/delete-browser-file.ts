import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

export const deleteBrowserFile = async (path: string) => {
  const { data } = await apiInstance.post(
    API_URLS.dashboard.deleteBrowserFile,
    {
      fileName: path,
    }
  );

  return data;
};
