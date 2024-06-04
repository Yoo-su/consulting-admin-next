'use client';

import { createContext, ReactNode, useEffect } from 'react';

import { useGetUnivListQuery } from '../hooks/tanstack/use-get-univ-list-query';
import { usePersistedState } from '@/shared/hooks/use-persisted-state';
import { Univ } from '../types/univ.type';
import { Service } from '../types/service.type';
import AppBackdrop from '@/shared/components/loadings/app-backrdrop';
import { createNewService, CreateNewServiceParams } from '../apis/create-new-service';
import toast from 'react-hot-toast';
export type UnivServiceContextValue = {
  univList: Univ[];
  serviceList: Service[];
  currentUniv: Univ | null;
  currentService: Service | null;
  setCurrentUniv: (univ: Univ) => void;
  setCurrentService: (service: Service | null) => void;
  setServiceList: (serviceList: Service[]) => void;
  updateServiceList: (newService: CreateNewServiceParams) => void;
};

export const UnivServiceContext = createContext<UnivServiceContextValue | undefined>(undefined);

type UnivServiceProviderProps = {
  children: ReactNode;
};
const UnivServiceProvider = ({ children }: UnivServiceProviderProps) => {
  const { refetch, isPending } = useGetUnivListQuery();

  const [univList, setUnivList] = usePersistedState<Univ[]>([], 'session', 'univ-list');
  const [serviceList, setServiceList] = usePersistedState<Service[]>([], 'session', 'service-list');
  const [currentUniv, setCurrentUniv] = usePersistedState<Univ | null>(null, 'session', 'univ');
  const [currentService, setCurrentService] = usePersistedState<Service | null>(null, 'session', 'service');

  useEffect(() => {
    refetch()
      .then((res) => {
        const filtered: Univ[] = res?.data?.filter((item) => item.isActive === true) ?? [];
        setUnivList(filtered);
      })
      .catch((error) => {
        setUnivList([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateServiceList = (newService: CreateNewServiceParams) => {
    try {
      createNewService(newService).then((res) => {
        if (res.status === 201) {
          toast.success('서비스가 추가되었습니다.');
        } else {
          toast.error('서비스 추가에 실패했습니다.');
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  };
  if (isPending) return <AppBackdrop />;

  return (
    <UnivServiceContext.Provider
      value={{
        univList,
        serviceList,
        currentUniv,
        currentService,
        setCurrentService,
        setCurrentUniv,
        setServiceList,
        updateServiceList,
      }}
    >
      {children}
    </UnivServiceContext.Provider>
  );
};

export default UnivServiceProvider;
