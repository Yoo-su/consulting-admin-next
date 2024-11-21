import { create } from 'zustand';

type CalculationSettingState = {
  currentSettingType: 'calc-config' | 'calc-method' | 'conversion-table';
};

export const useCalculationSettingStore = create<CalculationSettingState>(
  (set) => ({
    currentSettingType: 'calc-config',
  })
);
