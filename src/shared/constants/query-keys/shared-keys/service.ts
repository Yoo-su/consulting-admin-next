import { createQueryKeys } from '@lukemorales/query-key-factory';

export const serviceKeys = createQueryKeys('service', {
  'service-list': (univID: string) => [univID],
});
