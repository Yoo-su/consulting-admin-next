'use client';

import { useState, useCallback } from 'react';
import { getServiceList } from '@/features/dashboard/apis/get-service-list';
import { useUnivService } from './use-univ-service';
import { dummyServiceList } from '../constants/dummies/service-list.dummy';

export const useGetServiceList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setServiceList } = useUnivService();

  const execute = (univID: string) => {
    setIsLoading(true);
    getServiceList(univID)
      .then((res) => {
        setServiceList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setServiceList(dummyServiceList);
        setIsLoading(false);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return { isLoading, execute: useCallback(execute, []) };
};
