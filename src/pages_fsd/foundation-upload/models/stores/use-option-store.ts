import { create } from 'zustand';

type OptionStoreState = {
  isFileOnly: boolean;
  toggleIsFileOnly: () => void;
};
export const useOptionStore = create<OptionStoreState>((set) => ({
  isFileOnly: false,
  toggleIsFileOnly: () => set((state) => ({ isFileOnly: !state.isFileOnly })),
}));
