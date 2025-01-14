import { create } from 'zustand';

type FoundationStoreState = {
  file: File | null;
  formData: FormData;
  setFile: (file: File | null) => void;
};
export const useFoundationStore = create<FoundationStoreState>((set) => ({
  file: null,
  formData: new FormData(),
  setFile: (file) => set({ file: file }),
}));
