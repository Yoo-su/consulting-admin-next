import { apiInstance } from '../plugin/axios';
import { API_URLS } from '../constants';
import { BrowserItem } from '../models';

type GetBrowsedListResponse = {
  path: string;
  items: BrowserItem[];
};
export const getBrowsedList = async (path: string) => {
  const { data } = await apiInstance.get<GetBrowsedListResponse>(API_URLS.dashboard.browseFile, {
    params: {
      path,
    },
  });

  return data;
};
