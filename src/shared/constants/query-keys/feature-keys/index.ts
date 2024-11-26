import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { browserKeys } from '../feature-keys/browser';

export const FEATURE_KEYS = mergeQueryKeys(browserKeys);
