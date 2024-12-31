import { FlutterRowInfo, FlutterSetting } from '../models';
import { getConvertedRowValue } from './get-converted-row-value';

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
    const { RowIdx, RowValue, transferDefaultValue, children, ParentIdx } =
      item;
    const rowValue = getConvertedRowValue(transferDefaultValue, RowValue);
    const defaultValue = getConvertedRowValue(transferDefaultValue);
    if (isDeep && item.children.length > 0 && item.Type !== 'select') {
      return checkRowEdited(row, children, isDeep);
    }

    return (
      (RowIdx === row.RowIdx || ParentIdx === row.RowIdx) &&
      rowValue !== defaultValue
    );
  });
};
