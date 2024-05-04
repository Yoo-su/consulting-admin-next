'use client';

import { useState, useCallback, useEffect } from 'react';
import { getConsultingAppState } from '../apis/get-consultingapp-state';
import { ConsultingAppState } from '../types/consultingapp-state.type';
import { toast } from 'react-hot-toast';

export const useGetConsultingAppState = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ConsultingAppState[]>([]);

  const execute = () => {
    setLoading(true);

    getConsultingAppState()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('문제가 발생했습니다');
      });
    setLoading(false);
  };

  useEffect(() => {
    execute();
  }, []);

  return { loading, data, setData, execute: useCallback(execute, []) };
};
