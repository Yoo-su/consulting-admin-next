import { FlutterRowInfo, FlutterSetting } from '../models';
import { getArrayFromString } from './get-array-from-string';

export const checkChildEdited = (
  child: FlutterRowInfo,
  filteredSettingList: (FlutterSetting | FlutterRowInfo)[],
  isDeep: boolean = false
) => {
  return filteredSettingList.some((parent) =>
    checkRowEdited(child, parent.children, isDeep)
  );
};

const checkRowEdited = (
  row: FlutterRowInfo,
  rowList: FlutterRowInfo[],
  isDeep: boolean
): boolean => {
  return rowList.some((item) => {
    const { RowIdx, RowValue, transferDefaultValue, children } = item;
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

    if (isDeep && item.children.length > 0 && item.Type !== 'select') {
      return checkRowEdited(row, children, isDeep);
    }

    return RowIdx === row.RowIdx && rowValue !== defaultValue;
  });
};
