import { create } from 'zustand';

import { CalculationSettingDomain } from './types';

type CalculationSettingState = {
  dialogType: CalculationSettingDomain | null;
  isCalculationSettingDialogOpen: boolean;
  setDialogType: (dialogType: CalculationSettingDomain) => void;
  openCalculationSettingDialog: () => void;
  closeCalculationSettingDialog: () => void;
};

export const useCalculationSettingStore = create<CalculationSettingState>((set) => ({
  dialogType: null,
  isCalculationSettingDialogOpen: false,
  setDialogType: (dialogType) => set({ dialogType: dialogType }),
  openCalculationSettingDialog: () => set({ isCalculationSettingDialogOpen: true }),
  closeCalculationSettingDialog: () => set({ isCalculationSettingDialogOpen: false }),
}));
