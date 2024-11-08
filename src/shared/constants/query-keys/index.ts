import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { browserKeys } from './browser-keys';

export const QUERY_KEYS = mergeQueryKeys(browserKeys);
