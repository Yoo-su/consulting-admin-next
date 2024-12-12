import { createQueryKeys } from '@lukemorales/query-key-factory';

export const detailPageSettingKeys = createQueryKeys('detail-page-setting', {
  data: (serviceID: string) => [serviceID],
});
