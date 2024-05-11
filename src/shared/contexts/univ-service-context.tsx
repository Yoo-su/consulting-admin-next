'use client';

import { createContext, ReactNode, useEffect } from 'react';

import { useGetUnivListQuery } from '../hooks/tanstack/use-get-univ-list-query';
import { usePersistedState } from '../hooks/use-persisted-state';
import { Univ } from '../types/univ.type';
import { Service } from '../types/service.type';

export type UnivServiceContextValue = {
  univList: Univ[];
  serviceList: Service[];
  currentUniv: Univ | null;
  currentService: Service | null;
  setCurrentUniv: (univ: Univ) => void;
  setCurrentService: (service: Service | null) => void;
  setServiceList: (serviceList: Service[]) => void;
};

export const UnivServiceContext = createContext<UnivServiceContextValue | undefined>(undefined);

type UnivServiceProviderProps = {
  children: ReactNode;
};
const UnivServiceProvider = ({ children }: UnivServiceProviderProps) => {
  const { refetch } = useGetUnivListQuery();

  const [univList, setUnivList] = usePersistedState<Univ[]>([], 'session', 'univ-list');
  const [serviceList, setServiceList] = usePersistedState<Service[]>([], 'session', 'service-list');
  const [currentUniv, setCurrentUniv] = usePersistedState<Univ | null>(null, 'session', 'univ');
  const [currentService, setCurrentService] = usePersistedState<Service | null>(null, 'session', 'service');

  useEffect(() => {
    refetch().then((res) => {
      setUnivList(res?.data?.data ?? []);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UnivServiceContext.Provider
      value={{ univList, serviceList, currentUniv, currentService, setCurrentService, setCurrentUniv, setServiceList }}
    >
      {children}
    </UnivServiceContext.Provider>
  );
};

export default UnivServiceProvider;
