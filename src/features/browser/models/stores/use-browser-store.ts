import { create } from 'zustand';

import { BROWSER_SORT_OPTIONS } from '@/features/browser/constants/browser-sort-options';

import { DEFAULT_BROWSER_OPTION } from '../../constants';
import { BrowserOption, BrowserOptionOptional, SortOption } from '../types';

type BrowserStoreState = {
  basePath: string;
  currentPath: string;
  sortOption: SortOption;
  browserOption: BrowserOption;
  initPath: (path: string) => void;
  setCurrentPath: (path: string) => void;
  setSortOption: (option: SortOption) => void;
  setBrowserOption: (option: BrowserOption) => void;
};
export const useBrowserStore = create<BrowserStoreState>((set) => ({
  basePath: '',
  currentPath: '',
  sortOption: BROWSER_SORT_OPTIONS[0],
  browserOption: DEFAULT_BROWSER_OPTION,
  initPath: (path) => set({ basePath: path, currentPath: path }),
  setCurrentPath: (path) => set({ currentPath: path }),
  setSortOption: (option) => set({ sortOption: option }),
  setBrowserOption: (option) => set({ browserOption: option }),
}));
