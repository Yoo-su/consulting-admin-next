import { FlutterRowInfo, FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';

export const getFilteredCustomConfig = (categoryList: FlutterSetting[]): FlutterSetting[] => {
  const result = categoryList
    .map((category: FlutterSetting) => {
      const filteredChildren = category.children
        .map((child) => getFilteredChildren(child))
        .filter((child) => child !== null);
      return { ...category, children: filteredChildren };
    })
    .filter((category) => category.children.length > 0);
  return result as FlutterSetting[];
};

const getFilteredChildren = (rowInfo: FlutterRowInfo) => {
  const filteredItem: FlutterRowInfo = JSON.parse(JSON.stringify(rowInfo));
  let hasMatchingChild = false;
  const { children: rowChild } = rowInfo;
  if (rowChild.length > 0) {
    const filteredChildren = rowChild.map((child) => getFilteredChildren(child)).filter((child) => child !== null);
    if (filteredChildren.length > 0) {
      filteredItem.children = filteredChildren as FlutterRowInfo[];
      hasMatchingChild = true;
    }
  }
  if (
    (filteredItem.RowValue !== undefined && filteredItem.RowValue !== filteredItem.DefaultValue) ||
    hasMatchingChild
  ) {
    return filteredItem;
  }

  return null;
};
