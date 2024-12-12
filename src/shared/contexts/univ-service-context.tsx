'use client';

import { createContext, ReactNode, useEffect } from 'react';

import { usePersistedState } from '@/shared/hooks';

import { AppBackdrop } from '../components';
import { useGetServiceListQuery, useGetUnivListQuery } from '../hooks';
import { Service, Univ } from '../models';

export type UnivServiceContextValue = {
  univList: Univ[];
  serviceList: Service[];
  currentUniv: Univ | null;
  currentService: Service | null;
  isServiceListLoading: boolean;
  setCurrentUniv: (univ: Univ) => void;
  setCurrentService: (service: Service | null) => void;
};

export const UnivServiceContext = createContext<
  UnivServiceContextValue | undefined
>(undefined);

type UnivServiceProviderProps = {
  children: ReactNode;
};
export const UnivServiceProvider = ({ children }: UnivServiceProviderProps) => {
  const {
    data: univList,
    isPending: isUnivListLoading,
    isFetched: isUnivListFetched,
  } = useGetUnivListQuery();
  const [currentUniv, setCurrentUniv] = usePersistedState<Univ | null>(
    null,
    'session',
    'univ'
  );
  const { data: serviceList, isLoading: isServiceListPending } =
    useGetServiceListQuery(currentUniv?.univID);
  const [currentService, setCurrentService] = usePersistedState<Service | null>(
    null,
    'session',
    'service'
  );

  /**
   * 새로 fetch가 발생한 경우 세션 스토리지에 캐싱
   */
  useEffect(() => {
    if (univList.length && isUnivListFetched)
      sessionStorage.setItem('univ-list', JSON.stringify(univList));
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
