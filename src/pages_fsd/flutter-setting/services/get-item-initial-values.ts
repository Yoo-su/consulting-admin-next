import { getConvertedValue } from '@/shared/services';
import { FlutterRowInfo } from '../models';

export const getInitialValue = (item: FlutterRowInfo | undefined) => {
  const { transferDefaultValue = '', OriginalRowValue = null } = item ?? {};
  return OriginalRowValue ? OriginalRowValue : transferDefaultValue;
};

export const getItemValue = (item: FlutterRowInfo | undefined) => {
  // boolean만 현재 item이 undefined일 수 있어서 default value 처리
  const { transferDefaultValue = false, RowValue = null } = item ?? {};
  if (RowValue) return getConvertedValue(RowValue);
  return transferDefaultValue;
};
