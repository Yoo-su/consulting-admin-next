'use client';

import { useQuery } from '@tanstack/react-query';
import { getConsultingFileDownload, GetConsultingFileDownloadParams } from '../../apis/get-consulting-file-download';
import { useUnivService } from '../context/use-univ-service';

export const useGetConsultingFileDownloadQuery = (fileName: string) => {
  const { currentService } = useUnivService();

  const params: GetConsultingFileDownloadParams = {
    serviceID: currentService!.serviceID,
    fileName: fileName,
  };
  return useQuery({
    queryKey: ['consulting-file-download', params],
    queryFn: () => getConsultingFileDownload(params),
    enabled: false,
    retry: false,
  });
};
