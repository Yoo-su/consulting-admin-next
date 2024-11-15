import { API_URLS } from '../constants';
import { BrowserItem } from '../models';
import { apiInstance } from '../plugin/axios';

type GetBrowserListResponse = {
  path: string;
  items: BrowserItem[];
};
export const getBrowserList = async (path: string) => {
  const { data } = await apiInstance.get<GetBrowserListResponse>(
    API_URLS.dashboard.getbrowserFile,
    {
      params: {
        path,
      },
    }
  );

  return data;
};
