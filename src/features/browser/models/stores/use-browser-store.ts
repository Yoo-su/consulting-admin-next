import { create } from 'zustand';

import { BROWSER_SORT_OPTIONS } from '@/features/browser/constants/browser-sort-options';

import { SortOption } from '../types';

type BrowserStoreState = {
  basePath: string;
  currentPath: string;
  sortOption: SortOption;
  initPath: (path: string) => void;
  setCurrentPath: (path: string) => void;
  setSortOption: (option: SortOption) => void;
};
export const useBrowserStore = create<BrowserStoreState>((set) => ({
  basePath: '',
  currentPath: '',
  sortOption: BROWSER_SORT_OPTIONS[0],
  initPath: (path) => set({ basePath: path, currentPath: path }),
  setCurrentPath: (path) => set({ currentPath: path }),
  setSortOption: (option) => set({ sortOption: option }),
}));
