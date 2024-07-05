'use client';

import { useQuery } from '@tanstack/react-query';
import { useGetFlutterSetting } from '../use-get-flutter-setting';
import { GetFlutterCustomConfigParams } from '../../apis/get-flutter-custom-config';

export const useGetFlutterSettingQuery = ({ serviceID }: GetFlutterCustomConfigParams) => {
  return useQuery({
    queryKey: ['flutter-setting', { serviceID }],
    queryFn: useGetFlutterSetting,
  });
};
