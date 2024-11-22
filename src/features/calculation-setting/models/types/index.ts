export * from './calc-config';
export * from './calc-method';
export * from './conversion-table';

export type CalculationSettingDomain = 'config' | 'method' | 'conversion-table';
export type ColumnInfo = {
  helperText: string;
  disabled: boolean;
};
