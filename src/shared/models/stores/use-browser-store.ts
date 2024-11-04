// useBrowserStore.ts
import { create } from 'zustand';

// Store 상태 타입 정의
interface BrowserStoreState {
  basePath: string;
  currentPath: string;
  initPath: (path: string) => void;
  setCurrentPath: (path: string) => void;
}

// zustand store 생성
export const useBrowserStore = create<BrowserStoreState>((set) => ({
  basePath: '',
  currentPath: '',
  initPath: (path) => set({ basePath: path, currentPath: path }),
  setCurrentPath: (path) => set({ currentPath: path }),
}));
