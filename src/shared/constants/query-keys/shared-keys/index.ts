import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { serviceKeys } from './service';
import { univKeys } from './univ';

export const SHARED_KEYS = mergeQueryKeys(serviceKeys, univKeys);
