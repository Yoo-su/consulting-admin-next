import { createQueryKeys } from '@lukemorales/query-key-factory';

export const appVersionHistoryKeys = createQueryKeys('app-version-history', {
  data: (serviceID: string, osType: string) => [serviceID, osType],
});
