'use client';

import { getFlutterCategory } from '../apis/get-flutter-category';
import { getFlutterRowInfo } from '../apis/get-flutter-row-info';
import { FlutterRowInfo, FlutterSetting } from '../types/flutter-setting.type';

export const useGetFlutterBasicList = async () => {
  const categoryList: FlutterSetting[] = await getFlutterCategory();
  const rowInfo: FlutterRowInfo[] = await getFlutterRowInfo();
  categoryList.forEach((item) => {
    item.children = rowInfo.filter((row) => row.Category === item.Category);
  });

  return categoryList;
};
