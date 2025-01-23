import { getConvertedValue } from '@/shared/services';

export const getInitialValue = (
  transferDefaultValue: unknown = '',
  OriginalRowValue: string | null = null
): string => OriginalRowValue ?? (transferDefaultValue as string);

export const getItemValue = (
  RowValue: string | null = null,
  transferDefaultValue: unknown
) => {
  if (RowValue) return getConvertedValue(RowValue);
  return transferDefaultValue;
};
