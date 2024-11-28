import { createQueryKeys } from '@lukemorales/query-key-factory';

export const serviceKeys = createQueryKeys('service', {
  list: (univID: string) => [univID],
});
