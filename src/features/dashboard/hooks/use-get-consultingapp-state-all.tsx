'use client';

import { useState, useCallback, useEffect } from 'react';
import { ConsultingAppState } from '../types/consultingapp-state.type';

import { dummyConsultingAppStates } from '../constants/dummies/consultingapp-states.dummy';
import { getConsultingAppStateAll } from '../apis/get-consultingapp-state-all';

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
        setData(dummyConsultingAppStates);
        setLoading(false);
      });
  };

  useEffect(() => {
    execute();
  }, []);

  return { loading, data, setData, execute: useCallback(execute, []) };
};
