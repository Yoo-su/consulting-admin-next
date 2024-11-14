import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { browserKeys } from './browser';
import { serviceKeys } from './service';
import { univKeys } from './univ';

export const SHARED_KEYS = mergeQueryKeys(browserKeys, serviceKeys, univKeys);
