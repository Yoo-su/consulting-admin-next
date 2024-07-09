'use client';

import { createContext, ReactNode, useEffect } from 'react';

import { useGetUnivListQuery } from '../hooks/tanstack/use-get-univ-list-query';
import { usePersistedState } from '@/shared/hooks/use-persisted-state';
import { Univ } from '../types/univ.type';
import { Service } from '../types/service.type';
import AppBackdrop from '@/shared/components/loadings/app-backrdrop';
import { useGetServiceListQuery } from '../hooks/tanstack/use-get-service-list-query';
export type UnivServiceContextValue = {
  univList: Univ[];
  serviceList: Service[];
  currentUniv: Univ | null;
  currentService: Service | null;
  isServiceListLoading: boolean;
  setCurrentUniv: (univ: Univ) => void;
  setCurrentService: (service: Service | null) => void;
};

export const UnivServiceContext = createContext<UnivServiceContextValue | undefined>(undefined);

type UnivServiceProviderProps = {
  children: ReactNode;
};
const UnivServiceProvider = ({ children }: UnivServiceProviderProps) => {
  const { data: univList, isPending: isUnivListLoading, isFetched: isUnivListFetched } = useGetUnivListQuery();
  const [currentUniv, setCurrentUniv] = usePersistedState<Univ | null>(null, 'session', 'univ');
  const { data: serviceList, isLoading: isServiceListPending } = useGetServiceListQuery(currentUniv?.univID);
  const [currentService, setCurrentService] = usePersistedState<Service | null>(null, 'session', 'service');

  /**
   * 새로 fetch가 발생한 경우 세션 스토리지에 캐싱
   */
  useEffect(() => {
    if (univList.length && isUnivListFetched) sessionStorage.setItem('univ-list', JSON.stringify(univList));
  }, [univList.length]);

  if (isUnivListLoading) return <AppBackdrop />;

  return (
    <UnivServiceContext.Provider
      value={{
        univList,
        serviceList: serviceList ?? [],
        currentUniv,
        currentService,
        isServiceListLoading: isServiceListPending,
        setCurrentService,
        setCurrentUniv,
      }}
    >
      {children}
    </UnivServiceContext.Provider>
  );
};

export default UnivServiceProvider;
