'use client';

import { useQueries } from '@tanstack/react-query';
import { getFlutterCustomConfig } from '../../apis/get-flutter-custom-config';
import { setCustomConfig } from '../../services/flutter-setting/set-custom-config';
import { useGetFlutterBasicList } from '../use-get-flutter-basic-list';
import { FlutterSetting } from '../../types/flutter-setting.type';

export const useGetFlutterSettingsInfoQuery = ({ serviceID }: { serviceID: string }) => {
  return useQueries({
    queries: [
      {
        queryKey: ['flutter-basic-list'],
        queryFn: useGetFlutterBasicList,
        staleTime: Infinity,
      },
      {
        queryKey: ['flutter-custom-config', { serviceID }],
        queryFn: () => getFlutterCustomConfig({ serviceID }),
        staleTime: 0,
      },
    ],
    combine: (results) => {
      const [BasicListData, CustomeConfigData] = results;
      const basicList = BasicListData.data || [];
      const customConfig = CustomeConfigData.data || [];
      const categoryList = JSON.parse(JSON.stringify(basicList)) as FlutterSetting[];
      categoryList.forEach((category) => {
        customConfig.forEach((config) => setCustomConfig(category?.children ?? [], config.RowIdx, config.RowValue));
      });
      return { data: categoryList };
    },
  });
};
