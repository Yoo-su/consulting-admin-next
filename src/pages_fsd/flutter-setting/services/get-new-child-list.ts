import { FlutterSetting } from '../models';

export const getListByCategory = (
  originalList: FlutterSetting[],
  category: string
) => {
  return originalList.filter((list) => list.Category === category);
};

export const getChildrenByRowIdx = (list: FlutterSetting[], rowIdx: number) => {
  return list[0]?.children?.filter((item) => item.RowIdx === rowIdx) ?? [];
};
