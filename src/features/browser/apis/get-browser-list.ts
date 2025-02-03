import { API_URLS } from '@/shared/constants';
import { apiInstance } from '@/shared/plugin/axios';

import { BrowserItem } from '../models';

type GetBrowserListResponse = {
  path: string;
  items: BrowserItem[];
};
export const getBrowserList = async (path: string) => {
  const { data } = await apiInstance.get<GetBrowserListResponse>(API_URLS.dashboard.getbrowserFile, {
    params: {
      path,
    },
  });

  return data;
};
