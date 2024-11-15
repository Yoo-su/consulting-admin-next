import { createQueryKeys } from '@lukemorales/query-key-factory';

export const foundationLibraryKeys = createQueryKeys('foundation-library', {
  'library-data': (serviceID: string) => [serviceID],
});
