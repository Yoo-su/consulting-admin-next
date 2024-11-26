import { createQueryKeys } from '@lukemorales/query-key-factory';

export const chartSettingKeys = createQueryKeys('chart-setting', {
  data: (serviceID: string) => [serviceID],
});
