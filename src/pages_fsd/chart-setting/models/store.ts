import { create } from 'zustand';

import { ChartData } from './types';

type ChartSettingState = {
  isEditing: boolean;
  selectedModel: number | null;
  copiedChartData: ChartData[];

  setIsEditing: (option: boolean) => void;
  setSelectedModel: (modelNum: number | null) => void;
  setCopiedChartData: (data: ChartData[]) => void;
};
export const useChartSettingStore = create<ChartSettingState>()((set) => ({
  isEditing: false,
  selectedModel: null,
  copiedChartData: [],

  setIsEditing: (option) => set({ isEditing: option }),
  setSelectedModel: (modelNum) => set({ selectedModel: modelNum }),
  setCopiedChartData: (data) => set({ copiedChartData: data }),
}));
