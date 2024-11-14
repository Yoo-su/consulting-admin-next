import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { browserKeys } from './browser-keys';

export const SHARED_KEYS = mergeQueryKeys(browserKeys);
