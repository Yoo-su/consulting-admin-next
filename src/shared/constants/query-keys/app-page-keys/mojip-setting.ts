import { createQueryKeys } from '@lukemorales/query-key-factory';

export const mojipSettingKeys = createQueryKeys('mojip-setting', {
  'detailpage-data': (serviceID: string) => [serviceID],
});
