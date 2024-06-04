'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useGetConsultingAppState } from '../hooks/use-get-consultingapp-state';
import { ConsultingAppState } from '../types/consultingapp-state.type';

export type BoardType = 'mainUser'; //| 'all';
export type ViewOption = 'basic' | 'separated' | 'table';
export type DialogType = 'create' | 'modify';
export type ConsultingAppStateContextValue = {
  boardType: BoardType;
  setBoardType: (newType: BoardType) => void;
  viewOption: ViewOption;
  setViewOption: (newOption: ViewOption) => void;
  consultingAppStates: ConsultingAppState[];
  setConsultingAppStates: Dispatch<SetStateAction<ConsultingAppState[]>>;
  isLoading: boolean;
  dialogType: DialogType | null;
  isDialogOpen: boolean;
  dialogContentState: ConsultingAppState | null;
  setDialogContentState: (state: ConsultingAppState) => void;
  openDialog: (dialogType: DialogType) => void;
  closeDialog: () => void;
};

export const ConsultingAppStateContext = createContext<ConsultingAppStateContextValue | undefined>(undefined);

export type ConsultingAppStateProvider = {
  children: ReactNode;
};
const ConsultingAppStateProvider = ({ children }: ConsultingAppStateProvider) => {
  const { data, setData, loading, execute } = useGetConsultingAppState();
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
        consultingAppStates: data,
        isLoading: loading,
        setConsultingAppStates: setData,
        setBoardType,
        setViewOption,
        openDialog,
        closeDialog,
        setDialogContentState,
      }}
    >
      {children}
    </ConsultingAppStateContext.Provider>
  );
};

export default ConsultingAppStateProvider;
