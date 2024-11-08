import { create } from 'zustand';

type BrowserStoreState = {
  basePath: string;
  currentPath: string;
  initPath: (path: string) => void;
  setCurrentPath: (path: string) => void;
};
export const useBrowserStore = create<BrowserStoreState>((set) => ({
  basePath: '',
  currentPath: '',
  initPath: (path) => set({ basePath: path, currentPath: path }),
  setCurrentPath: (path) => set({ currentPath: path }),
}));
