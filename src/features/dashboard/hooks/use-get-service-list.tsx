'use client';

import { useState, useCallback } from 'react';
import { getServiceList } from '@/features/dashboard/apis/get-service-list';
import { useUnivService } from './context/use-univ-service';

export const useGetServiceList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setServiceList } = useUnivService();

  const execute = (univID: string) => {
    setIsLoading(true);
    getServiceList(univID)
      .then((res) => {
        setServiceList(res.data ?? []);
        setIsLoading(false);
      })
      .catch((error) => {
        setServiceList([]);
        setIsLoading(false);
      });
  };

  return { isLoading, execute: useCallback(execute, []) };
};
