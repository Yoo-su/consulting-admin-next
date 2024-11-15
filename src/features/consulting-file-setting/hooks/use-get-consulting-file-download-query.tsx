'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';
import { useUnivService } from '@/shared/hooks/context';

import {
  getConsultingFileDownload,
  GetConsultingFileDownloadParams,
} from '../apis';

export const useGetConsultingFileDownloadQuery = (fileName: string) => {
  const { currentService } = useUnivService();

  const params: GetConsultingFileDownloadParams = {
    serviceID: currentService!.serviceID,
    fileName: fileName,
  };
  return useQuery({
    queryKey:
      QUERY_KEYS['consulting-file-setting']['download-file'](params).queryKey,
    queryFn: () => getConsultingFileDownload(params),
    enabled: false,
    retry: false,
  });
};
