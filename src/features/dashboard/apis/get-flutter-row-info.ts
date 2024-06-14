import { authInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { FlutterRowInfo } from '../types/flutter-setting.type';

export const getFlutterRowInfo = async () => {
  const { data } = await authInstance.get<FlutterRowInfo[]>(apiUrls.dashboard.getFlutterRowInfo);
  return data;
};
