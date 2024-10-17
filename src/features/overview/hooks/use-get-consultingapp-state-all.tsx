'use client';

import { useState, useCallback, useEffect } from 'react';
import { ConsultingAppState } from '../models';

import { getConsultingAppStateAll } from '../apis';

export const useGetConsultingAppStateAll = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ConsultingAppState[]>([]);

  const execute = () => {
    setLoading(true);
    getConsultingAppStateAll()
      .then((response) => {
        const jungsiDatas = response.data.filter((item) => item.serviceType === 'J_A');
        setData(jungsiDatas);
        setLoading(false);
      })
      .catch((error) => {
        setData([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    execute();
  }, []);

  return { loading, data, setData, execute: useCallback(execute, []) };
};
