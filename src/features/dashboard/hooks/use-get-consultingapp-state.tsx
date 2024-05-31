'use client';

import { useState, useCallback, useEffect } from 'react';
import { GetConsultingAppStateParams, getConsultingAppState } from '../apis/get-consultingapp-state';
import { ConsultingAppState } from '../types/consultingapp-state.type';
import { toast } from 'react-hot-toast';

import { dummyConsultingAppStates } from '../constants/dummies/consultingapp-states.dummy';

export const useGetConsultingAppState = (params: GetConsultingAppStateParams) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ConsultingAppState[]>([]);

  const execute = () => {
    getConsultingAppState(params)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        /* console.log(error);
        toast.error('문제가 발생했습니다');
        setLoading(false); */
        setData(dummyConsultingAppStates);
        setLoading(false);
      });
  };

  useEffect(() => {
    execute();
  }, []);

  return { loading, data, setData, execute: useCallback(execute, []) };
};
