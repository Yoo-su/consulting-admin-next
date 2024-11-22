import { CalculationSettingDomain } from '../../models';
import { CONFIG_COLUMN_INFO, ConfigColumnInfo } from './config-column-info';
import { METHOD_COLUMN_INFO, MethodColumnInfo } from './method-column-info';

type CalculationColumnMap = Record<
  CalculationSettingDomain,
  ConfigColumnInfo | MethodColumnInfo
>;
export const COLUMN_INFO: CalculationColumnMap = {
  config: CONFIG_COLUMN_INFO,
  method: METHOD_COLUMN_INFO,
  'conversion-table': CONFIG_COLUMN_INFO,
};
