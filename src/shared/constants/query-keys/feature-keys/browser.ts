import { createQueryKeys } from '@lukemorales/query-key-factory';

export const browserKeys = createQueryKeys('browser', {
  data: (browserPath: string) => [browserPath],
});
