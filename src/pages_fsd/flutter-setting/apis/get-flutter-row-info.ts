import { API_URLS } from '@/shared/constants/api-urls';
import { authInstance } from '@/shared/plugin/axios';

import { FlutterRowInfo } from '../models';

export const getFlutterRowInfo = async () => {
  const { data } = await authInstance.get<FlutterRowInfo[]>(API_URLS.dashboard.getFlutterRowInfo);
  return data;
};
