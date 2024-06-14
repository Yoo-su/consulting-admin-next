import { authInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { FlutterCategory } from '../types/flutter-setting.type';

export const getFlutterCategory = async () => {
  const { data } = await authInstance.get<FlutterCategory[]>(apiUrls.dashboard.getFlutterCategory);
  return data;
};
