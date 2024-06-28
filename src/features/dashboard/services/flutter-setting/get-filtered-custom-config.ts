import { FlutterRowInfo, FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';

export const getFilteredCustomConfig = (categoryList: FlutterSetting[]): FlutterSetting[] => {
  const result = categoryList.map((category: FlutterSetting) => {
    const { children } = category;
    if (children) {
      const filteredChildren = children.map((child) => getFilteredChildren(child)).filter((child) => child !== null);
      return { ...category, children: filteredChildren };
    }
  });
  return result as FlutterSetting[];
};

const getFilteredChildren = (rowInfo: FlutterRowInfo) => {
  const filteredItem: FlutterRowInfo = { ...rowInfo };
  let hasMatchingChild = false;
  const { children: rowChild } = rowInfo;
  if (rowChild.length > 0) {
    const filteredChildren = rowChild.map((child) => getFilteredChildren(child)).filter((child) => child !== null);
    if (filteredChildren.length > 0) {
      filteredItem.children = filteredChildren as FlutterRowInfo[];
      hasMatchingChild = true;
    }
  }
  if (filteredItem.RowValue !== undefined || hasMatchingChild) {
    return filteredItem;
  }

  return null;
};
