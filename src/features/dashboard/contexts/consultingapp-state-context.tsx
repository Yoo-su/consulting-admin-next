'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useGetConsultingAppState } from '../hooks/use-get-consultingapp-state';
import { ConsultingAppState } from '../types/consultingapp-state.type';
import { useGetConsultingAppStateAll } from '../hooks/use-get-consultingapp-state-all';

export type BoardType = 'mainUser' | 'all';
export type ViewOption = 'basic' | 'separated' | 'table';
export type DialogType = 'create' | 'modify';
export type ConsultingAppStateContextValue = {
  boardType: BoardType;
  setBoardType: (newType: BoardType) => void;
  viewOption: ViewOption;
  setViewOption: (newOption: ViewOption) => void;
  consultingAppStates: ConsultingAppState[];
  setConsultingAppStates: Dispatch<SetStateAction<ConsultingAppState[]>>;
  consultingAppStatesAll: ConsultingAppState[];
  setConsultingAppStatesAll: Dispatch<SetStateAction<ConsultingAppState[]>>;
  isLoading: boolean;
  dialogType: DialogType | null;
  isDialogOpen: boolean;
  dialogContentState: ConsultingAppState | null;
  setDialogContentState: (state: ConsultingAppState) => void;
  openDialog: (dialogType: DialogType) => void;
  closeDialog: () => void;
  executeConsultingAppState: () => void;
  executeConsultingAppStateAll: () => void;
};

export const ConsultingAppStateContext = createContext<ConsultingAppStateContextValue | undefined>(undefined);

export type ConsultingAppStateProvider = {
  children: ReactNode;
};
const ConsultingAppStateProvider = ({ children }: ConsultingAppStateProvider) => {
  const {
    data: basicData,
    setData: setBasicData,
    loading,
    execute: executeConsultingAppState,
  } = useGetConsultingAppState();
  const { data: allData, setData: setAllData, execute: executeConsultingAppStateAll } = useGetConsultingAppStateAll();
  const [state, setState] = useState<
    Pick<
      ConsultingAppStateContextValue,
      'boardType' | 'viewOption' | 'dialogType' | 'isDialogOpen' | 'dialogContentState'
    >
  >({
    boardType: 'mainUser',
    viewOption: 'basic',
    dialogType: null,
    isDialogOpen: false,
    dialogContentState: null,
  });

  const setBoardType = (newType: BoardType) => {
    setState((prev) => ({ ...prev, boardType: newType }));
  };

  const setViewOption = (newOption: ViewOption) => {
    setState((prev) => ({ ...prev, viewOption: newOption }));
  };

  const openDialog = (dialogType: DialogType) => {
    setState((prev) => ({ ...prev, isDialogOpen: true, dialogType: dialogType }));
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, isDialogOpen: false }));
  };

  const setDialogContentState = (state: ConsultingAppState) => {
    setState((prev) => ({ ...prev, dialogContentState: state }));
  };

  return (
    <ConsultingAppStateContext.Provider
      value={{
        ...state,
        consultingAppStates: basicData,
        isLoading: loading,
        setConsultingAppStates: setBasicData,
        consultingAppStatesAll: allData,
        setConsultingAppStatesAll: setAllData,
        setBoardType,
        setViewOption,
        openDialog,
        closeDialog,
        setDialogContentState,
        executeConsultingAppState,
        executeConsultingAppStateAll,
      }}
    >
      {children}
    </ConsultingAppStateContext.Provider>
  );
};

export default ConsultingAppStateProvider;
