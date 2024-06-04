'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useGetConsultingAppState } from '../hooks/use-get-consultingapp-state';
import { ConsultingAppState } from '../types/consultingapp-state.type';
import { useUpdateConsultingAppStateMutation } from '../hooks/tanstack/use-update-consultingapp-state-mutation';
import toast from 'react-hot-toast';
import { UpdateConsultingAppStateParams } from '../apis/update-consultingapp-state';

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
  updateConsultingAppState: (newState: UpdateConsultingAppStateParams) => boolean;
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
  const { mutateAsync: updateConsultingAppStateMutation } = useUpdateConsultingAppStateMutation();

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

  const updateConsultingAppState = (newState: UpdateConsultingAppStateParams) => {
    let isSuccess = false;
    updateConsultingAppStateMutation(newState).then((res) => {
      if (res.status === 200) {
        toast.success('상태가 성공적으로 업데이트 되었습니다');
        isSuccess = true;
      } else {
        toast.error('상태 업데이트 중 문제가 발생했습니다');
        isSuccess = false;
      }
    });
    return isSuccess;
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
        updateConsultingAppState,
      }}
    >
      {children}
    </ConsultingAppStateContext.Provider>
  );
};

export default ConsultingAppStateProvider;
