'use client';

import { createContext, ReactNode, useState, useEffect } from 'react';
import { useGetUnivListQuery } from '../hooks/tanstack/use-get-univ-list-query';
import { Univ } from '../types/univ.type';
import { Service } from '../types/service.type';

export type UnivServiceContextValue = {
  univList: Univ[];
  serviceList: Service[];
  currentUniv: Univ | null;
  currentService: Service | null;
  setCurrentUniv: (univ: Univ) => void;
  setCurrentService: (service: Service) => void;
  setServiceList: (serviceList: Service[]) => void;
};

export const UnivServiceContext = createContext<UnivServiceContextValue | undefined>(undefined);

type UnivServiceProviderProps = {
  children: ReactNode;
};
const UnivServiceProvider = ({ children }: UnivServiceProviderProps) => {
  const { refetch } = useGetUnivListQuery();
  const [state, setState] = useState<
    Pick<UnivServiceContextValue, 'serviceList' | 'univList' | 'currentUniv' | 'currentService'>
  >({
    serviceList: [],
    univList: [],
    currentUniv: null,
    currentService: null,
  });

  const setCurrentUniv = (univ: Univ) => {
    setState((prev) => ({ ...prev, currentUniv: univ }));
  };

  const setCurrentService = (service: Service) => {
    setState((prev) => ({ ...prev, currentService: service }));
  };

  const setServiceList = (serviceList: Service[]) => {
    setState((prev) => ({ ...prev, serviceList: serviceList }));
  };

  useEffect(() => {
    refetch().then((res) => {
      setState((prev) => ({ ...prev, univList: res?.data?.data ?? [] }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UnivServiceContext.Provider value={{ ...state, setCurrentService, setCurrentUniv, setServiceList }}>
      {children}
    </UnivServiceContext.Provider>
  );
};

export default UnivServiceProvider;
