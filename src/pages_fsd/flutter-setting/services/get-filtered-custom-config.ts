import { FlutterRowInfo, FlutterSetting } from '../models';
import { getArrayFromString } from './get-array-from-string';

export const getFilteredCustomConfig = (
  categoryList: FlutterSetting[]
): FlutterSetting[] => {
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
  const { RowValue, transferDefaultValue } = filteredItem;
  let hasMatchingChild = false;
  const { children: rowChild } = rowInfo;
  if (rowChild.length > 0) {
    const filteredChildren = rowChild
      .map((child) => getFilteredChildren(child))
      .filter((child) => child !== null);

    if (filteredChildren.length > 0) {
      filteredItem.children = filteredChildren as FlutterRowInfo[];
      hasMatchingChild = true;
    }
  }
  const rowValue = Array.isArray(transferDefaultValue)
    ? JSON.stringify(getArrayFromString(RowValue ?? ''))
    : typeof transferDefaultValue === 'number'
    ? Number(RowValue)
    : RowValue;
  const defaultValue = Array.isArray(transferDefaultValue)
    ? JSON.stringify(transferDefaultValue)
    : typeof transferDefaultValue === 'number'
    ? Number(transferDefaultValue)
    : transferDefaultValue;
  if (
    (RowValue !== undefined && rowValue !== defaultValue) ||
    hasMatchingChild
  ) {
    return filteredItem;
  }

  return null;
};
