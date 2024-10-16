'use client';

import { useState, useCallback, useEffect } from 'react';
import { ConsultingAppState } from '../models';

import { getConsultingAppStateAll } from '../apis';

export const useGetConsultingAppStateAll = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ConsultingAppState[]>([]);

  const execute = () => {
    getConsultingAppStateAll()
      .then((response) => {
        setData(response.data);
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
