import { create } from 'zustand';

type QueueStore = {
  queueFiles: File[];
  addFiles: (files: File[]) => void;
  removeFile: (fileName: string) => void;
  resetFiles: () => void;
};

export const useQueueStore = create<QueueStore>((set) => ({
  queueFiles: [],

  addFiles: (files) =>
    set((state) => {
      const existingFileNames = new Set(state.queueFiles.map((file) => file.name));
      const uniqueFiles = files.filter((file) => !existingFileNames.has(file.name));
      return { queueFiles: [...state.queueFiles, ...uniqueFiles] };
    }),

  removeFile: (fileName) =>
    set((state) => ({
      queueFiles: state.queueFiles.filter((file) => file.name !== fileName),
    })),

  resetFiles: () => set({ queueFiles: [] }),
}));
