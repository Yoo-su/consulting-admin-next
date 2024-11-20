import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { appVersionHistoryKeys } from './app-version-history';
import { calculationSettingKeys } from './calculation-setting';
import { chartSettingKeys } from './chart-setting';
import { consultingFileSettingKeys } from './consulting-file-setting';
import { etcLibraryKeys } from './etc-library';
import { flutterSettingKeys } from './flutter-setting';
import { foundationLibraryKeys } from './foundation-library';
import { mojipSettingKeys } from './mojip-setting';
import { overviewKeys } from './overview';

export const FEATURE_KEYS = mergeQueryKeys(
  etcLibraryKeys,
  chartSettingKeys,
  flutterSettingKeys,
  foundationLibraryKeys,
  consultingFileSettingKeys,
  appVersionHistoryKeys,
  overviewKeys,
  calculationSettingKeys,
  mojipSettingKeys
);
