'use client';

import { useState, useCallback } from 'react';
import { getServiceList } from '@/features/dashboard/apis/get-service-list';
import { useUnivService } from './use-univ-service';
import { Service } from '../types/service.type';

export const useGetServiceList = () => {
  const [data, setData] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setServiceList } = useUnivService();

  const execute = (univID: string) => {
    setIsLoading(true);
    getServiceList(univID).then((res) => {
      setData(res.data);
      setServiceList(res.data);
      setIsLoading(false);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return { data, isLoading, execute: useCallback(execute, []) };
};
