import { create } from 'zustand';

import { getServiceYear } from '@/shared/lib/date';

import { BoardType, ServiceDetail, ServiceType, ViewOption } from './types';

type BoardStore = {
  boardType: BoardType;
  viewOption: ViewOption;
  isDialogOpen: boolean;
  dialogContent: ServiceDetail | null;
  selectedServiceYear: string;
  selectedServiceType: ServiceType;

  setViewOption: (newViewOption: ViewOption) => void;
  setBoardType: (newBoardType: BoardType) => void;
  setDialogContent: (serviceDetail: ServiceDetail) => void;
  toggleDialog: (toggleValue: boolean) => void;
  setSelectedServiceYear: (newServiceYear: string) => void;
  setSelectedServiceType: (newServiceType: ServiceType) => void;
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  boardType: 'mainUser',
  viewOption: 'basic',
  isDialogOpen: false,
  dialogContent: null,
  selectedServiceYear: getServiceYear().toString(),
  selectedServiceType: new Date().getMonth() > 8 ? 'J_A' : 'S_A',

  setBoardType: (newBoardType: BoardType) => set((state) => ({ boardType: newBoardType })),
  setViewOption: (newViewOption: ViewOption) => set((state) => ({ viewOption: newViewOption })),
  setDialogContent: (serviceDetail: ServiceDetail) => set((state) => ({ dialogContent: serviceDetail })),
  toggleDialog: (toggleValue: boolean) => set((state) => ({ isDialogOpen: toggleValue })),
  setSelectedServiceYear: (newServiceYear: string) => set((state) => ({ selectedServiceYear: newServiceYear })),
  setSelectedServiceType: (newServiceType: ServiceType) => set((state) => ({ selectedServiceType: newServiceType })),
}));
