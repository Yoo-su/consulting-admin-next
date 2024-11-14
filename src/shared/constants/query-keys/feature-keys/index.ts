import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { etcLibraryKeys } from './etc-library';
import { chartSettingKeys } from './chart-setting';
import { flutterSettingKeys } from './flutter-setting';
import { foundationLibraryKeys } from './foundation-library';
import { consultingFileSettingKeys } from './consulting-file-setting';
import { appVersionHistoryKeys } from './app-version-history';

export const FEATURE_KEYS = mergeQueryKeys(
  etcLibraryKeys,
  chartSettingKeys,
  flutterSettingKeys,
  foundationLibraryKeys,
  consultingFileSettingKeys,
  appVersionHistoryKeys
);
