import { createQueryKeys } from '@lukemorales/query-key-factory';

export const calculationSettingKeys = createQueryKeys('calculation-setting', {
  'conversion-table': (serviceID: string) => [serviceID],
  'calc-config': (serviceID: string) => [serviceID],
  'calc-method': (serviceID: string) => [serviceID],
});
