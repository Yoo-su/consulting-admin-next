import { AlertColor } from '@mui/material';
import { create } from 'zustand';

type AlertOption = {
  color: AlertColor;
  message: string;
};
type UseUiStoreState = {
  isDataChecked: boolean;
  alertOption: AlertOption | null;
  setIsDataChecked: (option: boolean) => void;
  setAlertOption: (option: AlertOption | null) => void;
};
export const useUiStore = create<UseUiStoreState>((set) => ({
  isDataChecked: false,
  alertOption: null,

  setIsDataChecked: (option) => set({ isDataChecked: option }),
  setAlertOption: (option) => set({ alertOption: option }),
}));
