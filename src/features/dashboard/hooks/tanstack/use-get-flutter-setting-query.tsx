'use client';

import { useQuery } from '@tanstack/react-query';
import { useGetFlutterSetting } from '../use-get-flutter-setting';

export const useGetFlutterSettingQuery = () => {
  return useQuery({
    queryKey: ['flutter-setting'],
    queryFn: useGetFlutterSetting,
    staleTime: Infinity,
    enabled: false,
  });
};
