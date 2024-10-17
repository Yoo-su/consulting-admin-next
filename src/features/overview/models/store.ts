import { create } from 'zustand';
import { BoardType, ConsultingAppState, ServiceType, ViewOption } from './types';

type StatusBoardStore = {
  boardType: BoardType;
  viewOption: ViewOption;
  isDialogOpen: boolean;
  dialogContentState: ConsultingAppState | null;
  selectedServiceYear: string;
  selectedServiceType: ServiceType;

  setViewOption: (newViewOption: ViewOption) => void;
  setBoardType: (newBoardType: BoardType) => void;
  setDialogContentState: (consultingAppState: ConsultingAppState) => void;
  toggleDialog: (toggleValue: boolean) => void;
  setSelectedServiceYear: (newServiceYear: string) => void;
  setSelectedServiceType: (newServiceType: ServiceType) => void;
};

export const useStatusBoardStore = create<StatusBoardStore>((set, get) => ({
  boardType: 'mainUser',
  viewOption: 'basic',
  isDialogOpen: false,
  dialogContentState: null,
  selectedServiceYear: (new Date().getFullYear() + 1).toString(),
  selectedServiceType: new Date().getMonth() > 8 ? 'J_A' : 'S_A',

  setBoardType: (newBoardType: BoardType) => set((state) => ({ boardType: newBoardType })),
  setViewOption: (newViewOption: ViewOption) => set((state) => ({ viewOption: newViewOption })),
  setDialogContentState: (consultingAppState: ConsultingAppState) =>
    set((state) => ({ dialogContentState: consultingAppState })),
  toggleDialog: (toggleValue: boolean) => set((state) => ({ isDialogOpen: toggleValue })),
  setSelectedServiceYear: (newServiceYear: string) => set((state) => ({ selectedServiceYear: newServiceYear })),
  setSelectedServiceType: (newServiceType: ServiceType) => set((state) => ({ selectedServiceType: newServiceType })),
}));
