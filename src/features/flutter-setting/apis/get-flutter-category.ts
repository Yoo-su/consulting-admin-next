import { authInstance } from '@/shared/plugin/axios';
import { API_URLS } from '@/shared/constants/api-urls';
import { FlutterSetting } from '../models';

export const getFlutterCategory = async () => {
  const { data } = await authInstance.get<FlutterSetting[]>(API_URLS.dashboard.getFlutterCategory);
  return data;
};
