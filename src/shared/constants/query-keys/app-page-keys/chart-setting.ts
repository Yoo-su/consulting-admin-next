import { createQueryKeys } from '@lukemorales/query-key-factory';

export const chartSettingKeys = createQueryKeys('chart-setting', {
  'chart-data': (serviceID: string) => [serviceID],
});
