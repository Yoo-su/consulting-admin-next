import { create } from 'zustand';

import { DialogType } from './types';

type CalculationSettingState = {
  dialogType: DialogType | null;
  isCalculationSettingDialogOpen: boolean;
  setDialogType: (dialogType: DialogType) => void;
  openCalculationSettingDialog: () => void;
  closeCalculationSettingDialog: () => void;
};

export const useCalculationSettingStore = create<CalculationSettingState>(
  (set) => ({
    dialogType: null,
    isCalculationSettingDialogOpen: false,
    setDialogType: (dialogType) => set({ dialogType: dialogType }),
    openCalculationSettingDialog: () =>
      set({ isCalculationSettingDialogOpen: true }),
    closeCalculationSettingDialog: () =>
      set({ dialogType: null, isCalculationSettingDialogOpen: false }),
  })
);
