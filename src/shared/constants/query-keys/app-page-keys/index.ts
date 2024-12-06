import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { appVersionHistoryKeys } from './app-version-history';
import { calculationSettingKeys } from './calculation-setting';
import { chartSettingKeys } from './chart-setting';
import { consultingFileSettingKeys } from './consulting-file-setting';
import { detailPageSettingKeys } from './detail-page-setting';
import { etcLibraryKeys } from './etc-library';
import { flutterSettingKeys } from './flutter-setting';
import { foundationLibraryKeys } from './foundation-library';
import { overviewKeys } from './overview';

export const APP_PAGE_KEYS = mergeQueryKeys(
  etcLibraryKeys,
  chartSettingKeys,
  flutterSettingKeys,
  foundationLibraryKeys,
  consultingFileSettingKeys,
  appVersionHistoryKeys,
  overviewKeys,
  calculationSettingKeys,
  detailPageSettingKeys
);
