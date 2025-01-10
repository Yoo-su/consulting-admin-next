import { create } from 'zustand';

export type QueueType = 'browser' | 'dialog';
type QueueStore = {
  browserQueue: File[];
  dialogQueue: File[];
  isAddDirectoryModalOpen: boolean;
  addBrowserQueueFiles: (files: File[]) => void;
  addDialogQueueFiles: (files: File[]) => void;
  removeBrowserQueueFile: (fileName: string) => void;
  removeDialogQueueFile: (fileName: string) => void;
  resetBrowserQueue: () => void;
  resetDialogQueue: () => void;
  openAddDirectoryModal: () => void;
  closeAddDirectoryModal: () => void;
};
export const useQueueStore = create<QueueStore>((set) => ({
  browserQueue: [],
  dialogQueue: [],
  isAddDirectoryModalOpen: false,
  addBrowserQueueFiles: (files) =>
    set((state) => {
      const existingFileNames = new Set(
        state.browserQueue.map((file) => file.name)
      );
      const uniqueFiles = files.filter(
        (file) => !existingFileNames.has(file.name)
      );
      return { browserQueue: [...state.browserQueue, ...uniqueFiles] };
    }),

  addDialogQueueFiles: (files) =>
    set((state) => {
      const existingFileNames = new Set(
        state.dialogQueue.map((file) => file.name)
      );
      const uniqueFiles = files.filter(
        (file) => !existingFileNames.has(file.name)
      );
      return { dialogQueue: [...state.dialogQueue, ...uniqueFiles] };
    }),

  removeBrowserQueueFile: (fileName) =>
    set((state) => ({
      browserQueue: state.browserQueue.filter((file) => file.name !== fileName),
    })),

  removeDialogQueueFile: (fileName) =>
    set((state) => ({
      dialogQueue: state.dialogQueue.filter((file) => file.name !== fileName),
    })),

  resetBrowserQueue: () => set(() => ({ browserQueue: [] })),
  resetDialogQueue: () => set(() => ({ dialogQueue: [] })),

  openAddDirectoryModal: () => set(() => ({ isAddDirectoryModalOpen: true })),
  closeAddDirectoryModal: () =>
    set(() => ({ dialogQueue: [], isAddDirectoryModalOpen: false })),
}));
