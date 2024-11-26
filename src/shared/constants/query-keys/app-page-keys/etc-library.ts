import { createQueryKeys } from '@lukemorales/query-key-factory';

export const etcLibraryKeys = createQueryKeys('etc-library', {
  'library-data': (serviceID: string) => [serviceID],
});
