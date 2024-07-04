'use client';

import { useQueries } from '@tanstack/react-query';
import { getFlutterCategory } from '../../apis/get-flutter-category';
import { getFlutterRowInfo } from '../../apis/get-flutter-row-info';
import { getFlutterCustomConfig } from '../../apis/get-flutter-custom-config';
import { setCustomConfig } from '../../services/flutter-setting/set-custom-config';

export const useGetFlutterSettingsInfoQuery = ({ serviceID }: { serviceID: string }) => {
  return useQueries({
    queries: [
      {
        queryKey: ['flutter-category'],
        queryFn: getFlutterCategory,
        staleTime: Infinity,
      },
      {
        queryKey: ['flutter-row-info'],
        queryFn: getFlutterRowInfo,
        staleTime: 60000,
      },
      {
        queryKey: ['flutter-custom-config'],
        queryFn: () => getFlutterCustomConfig({ serviceID }),
        staleTime: 60000,
      },
    ],
    combine: (results) => {
      const [CategoryListData, RowInfoData, CustomeConfigData] = results;
      const categoryList = CategoryListData.data || [];
      const rowInfo = RowInfoData.data || [];
      const customConfig = CustomeConfigData.data || [];
      categoryList.forEach((item) => {
        item.children = rowInfo.filter((row) => row.Category === item.Category);
      });
      categoryList.forEach((category) => {
        customConfig.forEach((config) => setCustomConfig(category?.children ?? [], config.RowIdx, config.RowValue));
      });
      return { data: categoryList };
    },
  });
};
