'use client';

import { getFlutterCategory } from '../apis/get-flutter-category';
import { GetFlutterCustomConfigParams, getFlutterCustomConfig } from '../apis/get-flutter-custom-config';
import { getFlutterRowInfo } from '../apis/get-flutter-row-info';
import { setCustomConfig } from '../services/flutter-setting/set-custom-config';
import { FlutterRowInfo, FlutterSetting } from '../types/flutter-setting.type';

export const useGetFlutterSetting = async ({ queryKey }: { queryKey: [string, GetFlutterCustomConfigParams] }) => {
  const { serviceID } = queryKey[1];
  const categoryList: FlutterSetting[] = await getFlutterCategory();
  const rowInfo: FlutterRowInfo[] = await getFlutterRowInfo();
  categoryList.forEach((item) => {
    item.children = rowInfo.filter((row) => row.Category === item.Category);
  });
  try {
    await getFlutterCustomConfig({ serviceID }).then((customConfig) => {
      console.log('customConfig inside');
      categoryList.forEach((category) => {
        customConfig.forEach((config) => setCustomConfig(category?.children ?? [], config.RowIdx, config.RowValue));
      });
    });
  } catch (e) {
    console.error(e);
  }

  return categoryList;
};
