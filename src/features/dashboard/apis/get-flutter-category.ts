import { authInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { FlutterSetting } from '../types/flutter-setting.type';

export const getFlutterCategory = async () => {
  const { data } = await authInstance.get<FlutterSetting[]>(apiUrls.dashboard.getFlutterCategory);
  return data;
};
