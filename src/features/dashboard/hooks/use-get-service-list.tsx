'use client';

import { useState, useCallback } from 'react';
import { getServiceList } from '@/features/dashboard/apis/get-service-list';
import { useUnivService } from './use-univ-service';
import { Service } from '@/features/dashboard/types/service.type';

export const useGetServiceList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setServiceList } = useUnivService();

  const execute = (univID: string) => {
    setIsLoading(true);
    getServiceList(univID)
      .then((res) => {
        const refined: Service[] =
          res?.data?.map((item) => {
            return {
              serviceID: item.ServiceID,
              schoolYear: item.SchoolYear,
              isSusi: item.IsSusi,
              univID: item.UnivID,
              serviceName: item.ServiceName,
              developer: item.Developer,
              manager: item.Manager,
            };
          }) ?? [];
        setServiceList(refined);
        setIsLoading(false);
      })
      .catch((error) => {
        setServiceList([]);
        setIsLoading(false);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return { isLoading, execute: useCallback(execute, []) };
};
