'use client';

import { useState, useCallback, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { toast } from 'react-hot-toast';

import { getConsultingAppState } from '../apis';
import { ConsultingAppState } from '../models';

export const useGetConsultingAppState = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ConsultingAppState[]>([]);

  const execute = () => {
    getConsultingAppState()
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(<Typography variant="body2">문제가 발생했습니다</Typography>);
        setLoading(false);
      });
  };

  useEffect(() => {
    execute();
  }, []);

  return { loading, data, setData, execute: useCallback(execute, []) };
};
