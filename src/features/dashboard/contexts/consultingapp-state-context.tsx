'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useGetConsultingAppState } from '../hooks/use-get-consultingapp-state';
import { ConsultingAppState } from '../types/consultingapp-state.type';

export type BoardType = 'basic' | 'developer' | 'whole';
export type DialogType = 'create' | 'modify';
export type ConsultingAppStateContextValue = {
  boardType: BoardType;
  setBoardType: (newType: BoardType) => void;
  consultingAppStates: ConsultingAppState[];
  setConsultingAppStates: Dispatch<SetStateAction<ConsultingAppState[]>>;
  isLoading: boolean;
  dialogType: DialogType | null;
  isDialogOpen: boolean;
  openDialog: (dialogType: DialogType) => void;
  closeDialog: () => void;
};

export const ConsultingAppStateContext = createContext<ConsultingAppStateContextValue | undefined>(undefined);

export type ConsultingAppStateProvider = {
  children: ReactNode;
};
const ConsultingAppStateProvider = ({ children }: ConsultingAppStateProvider) => {
  const { data, setData, loading } = useGetConsultingAppState();
  const [state, setState] = useState<Pick<ConsultingAppStateContextValue, 'boardType' | 'dialogType' | 'isDialogOpen'>>(
    {
      boardType: 'basic',
      dialogType: null,
      isDialogOpen: false,
    }
  );

  const setBoardType = (newType: BoardType) => {
    setState((prev) => ({ ...state, boardType: newType }));
  };

  const openDialog = (dialogType: DialogType) => {
    setState((prev) => ({ ...state, isDialogOpen: true, dialogType: dialogType }));
  };

  const closeDialog = () => {
    setState((prev) => ({ ...state, isDialogOpen: false }));
  };

  return (
    <ConsultingAppStateContext.Provider
      value={{
        ...state,
        consultingAppStates: data,
        isLoading: loading,
        setConsultingAppStates: setData,
        setBoardType,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </ConsultingAppStateContext.Provider>
  );
};

export default ConsultingAppStateProvider;
