import { createQueryKeys } from '@lukemorales/query-key-factory';

import { GetConsultingFileDownloadParams } from '@/pages_fsd/consulting-file-setting/apis';

export const consultingFileSettingKeys = createQueryKeys(
  'consulting-file-setting',
  {
    'download-file': ({
      serviceID,
      fileName,
    }: GetConsultingFileDownloadParams) => [{ serviceID, fileName }],
  }
);
