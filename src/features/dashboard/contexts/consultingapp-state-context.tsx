'use client';

import { createContext, ReactNode, useState } from 'react';
import { useGetConsultingAppState } from '../hooks/use-get-consultingapp-state';
import { ConsultingAppState } from '../types/consultingapp-state.type';

export type BoardType = 'basic' | 'developer' | 'whole';
export type ConsultingAppStateContextValue = {
  boardType: BoardType;
  consultingAppStates: ConsultingAppState[];
  setConsultingAppStates: any;
  isLoading: boolean;
  setBoardType: (newType: BoardType) => void;
};

export const ConsultingAppStateContext = createContext<ConsultingAppStateContextValue | undefined>(undefined);

export type ConsultingAppStateProvider = {
  children: ReactNode;
};
const ConsultingAppStateProvider = ({ children }: ConsultingAppStateProvider) => {
  const { data, setData, loading } = useGetConsultingAppState();
  const [state, setState] = useState<Pick<ConsultingAppStateContextValue, 'boardType'>>({
    boardType: 'basic',
  });

  const setBoardType = (newType: BoardType) => {
    setState((prev) => ({ ...state, boardType: newType }));
  };

  return (
    <ConsultingAppStateContext.Provider
      value={{ ...state, consultingAppStates: data, isLoading: loading, setConsultingAppStates: setData, setBoardType }}
    >
      {children}
    </ConsultingAppStateContext.Provider>
  );
};

export default ConsultingAppStateProvider;
