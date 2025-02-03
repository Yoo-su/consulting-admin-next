import { getArrayFromString } from './get-array-from-string';

export const getConvertedRowValue = (defaultValue: any, value?: any) => {
  const rowValue = value ? value : defaultValue;

  if (Array.isArray(defaultValue)) return JSON.stringify(value ? getArrayFromString(value as string) : defaultValue);
  if (typeof defaultValue === 'number') {
    return Number(rowValue);
  }
  if (typeof defaultValue === 'boolean') {
    return value ? rowValue === 'true' : defaultValue;
  }
  return rowValue;
};
