'use client';

import { createContext, ReactNode } from 'react';

import { usePersistedState } from '@/shared/hooks/use-persisted-state';
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
  univs: Univ[];
};
const UnivServiceProvider = ({ children, univs }: UnivServiceProviderProps) => {
  const [univList, setUnivList] = usePersistedState<Univ[]>(univs, 'session', 'univ-list');
  const [serviceList, setServiceList] = usePersistedState<Service[]>([], 'session', 'service-list');
  const [currentUniv, setCurrentUniv] = usePersistedState<Univ | null>(null, 'session', 'univ');
  const [currentService, setCurrentService] = usePersistedState<Service | null>(null, 'session', 'service');

  return (
    <UnivServiceContext.Provider
      value={{ univList, serviceList, currentUniv, currentService, setCurrentService, setCurrentUniv, setServiceList }}
    >
      {children}
    </UnivServiceContext.Provider>
  );
};

export default UnivServiceProvider;
