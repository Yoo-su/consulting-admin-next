'use client';

import { useQueries } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getFlutterCustomConfig } from '../apis';
import { FlutterSetting } from '../models';
import { setCustomConfig } from '../services';
import { useGetFlutterBasicList } from './use-get-flutter-basic-list';

export const useGetFlutterSettingsInfoQuery = ({
  serviceID,
}: {
  serviceID: string;
}) => {
  return useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS['flutter-setting']['basic-list'].queryKey,
        queryFn: useGetFlutterBasicList,
        staleTime: Infinity,
      },
      {
        queryKey:
          QUERY_KEYS['flutter-setting']['custom-config'](serviceID).queryKey,
        queryFn: () => getFlutterCustomConfig({ serviceID }),
        staleTime: 0,
      },
    ],
    combine: (results) => {
      const [BasicListData, CustomeConfigData] = results;
      const basicList = BasicListData.data || [];
      const customConfig = CustomeConfigData.data || [];
      const categoryList = JSON.parse(
        JSON.stringify(basicList)
      ) as FlutterSetting[];
      categoryList.forEach((category) => {
        customConfig.forEach((config) =>
          setCustomConfig(
            category?.children ?? [],
            config.RowIdx,
            config.RowValue
          )
        );
      });
      return { data: categoryList };
    },
  });
};
