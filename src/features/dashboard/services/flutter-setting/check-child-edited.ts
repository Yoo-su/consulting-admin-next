import { FlutterRowInfo, FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';

export const checkChildEdited = (
  child: FlutterRowInfo,
  filteredSettingList: (FlutterSetting | FlutterRowInfo)[],
  isDeep: boolean = false
) => {
  return filteredSettingList.some((parent) => checkRowEdited(child, parent.children, isDeep));
};

const checkRowEdited = (row: FlutterRowInfo, rowList: FlutterRowInfo[], isDeep: boolean): boolean => {
  return rowList.some((item) => {
    if (isDeep && item.children.length > 0) {
      return checkRowEdited(row, item.children, isDeep);
    }
    return item.RowIdx === row.RowIdx && item.RowValue !== item.DefaultValue;
  });
};
