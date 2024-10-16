import { FlutterRowInfo } from '../models';

export const setCustomConfig = (rowInfo: FlutterRowInfo | FlutterRowInfo[], idx: number, rowValue: string) => {
  if (Array.isArray(rowInfo) && rowInfo.length > 0) {
    for (const row in rowInfo) {
      if (rowInfo[row].RowIdx === idx) {
        rowInfo[row].RowValue = rowValue;
        rowInfo[row].OriginalRowValue = rowValue;
        return;
      }
      if (rowInfo[row].children) {
        setCustomConfig(rowInfo[row].children, idx, rowValue);
      }
    }
  } else {
    if ((rowInfo as FlutterRowInfo).RowIdx === idx) {
      (rowInfo as FlutterRowInfo).RowValue = rowValue;
      (rowInfo as FlutterRowInfo).OriginalRowValue = rowValue;
      return;
    }
  }
};
