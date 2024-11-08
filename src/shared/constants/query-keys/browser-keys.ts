import { createQueryKeys } from '@lukemorales/query-key-factory';

export const browserKeys = createQueryKeys('browser', {
  items: (browserPath: string) => [browserPath],
});
