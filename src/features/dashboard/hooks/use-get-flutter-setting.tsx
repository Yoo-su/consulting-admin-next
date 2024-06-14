'use client';

import { getFlutterCategory } from '../apis/get-flutter-category';
import { getFlutterRowInfo } from '../apis/get-flutter-row-info';
import { FlutterRowInfo, FlutterSetting } from '../types/flutter-setting.type';

export const useGetFlutterSetting = async () => {
  const categoryList: FlutterSetting[] = [];
  const rowInfo: FlutterRowInfo[] = [];
  await getFlutterCategory().then((res) => {
    categoryList.push(...res);
  });
  await getFlutterRowInfo().then((res) => {
    rowInfo.push(...res);
  });
  categoryList.forEach((item) => {
    item.children = rowInfo.filter((row) => row.Category === item.Category);
  });
  return categoryList;
};
