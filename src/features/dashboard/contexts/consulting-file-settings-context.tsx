'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

export type ConsultingFileSettingsContextValue = {
  files: UploadedFile[];
  setFiles: Dispatch<SetStateAction<UploadedFile[]>>;
  fileEnter: boolean;
  setFileEnter: Dispatch<SetStateAction<boolean>>;
  editFileName: boolean[];
  setEditFileName: Dispatch<SetStateAction<boolean[]>>;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  addToFiles: (uploadedFile: File | undefined) => void;
};

export const ConsultingFileSettingsContext = createContext<ConsultingFileSettingsContextValue | null>(null);

type ConsultingFileSettingsProvider = {
  children: ReactNode;
};

export type UploadedFile = {
  no: number;
  title: string;
  fileName: string;
};

const ConsultingFileSettingsProvider = ({ children }: ConsultingFileSettingsProvider) => {
  const [files, setFiles] = useState<UploadedFile[]>([
    { no: 1, title: '2025 수시 모집요강', fileName: '2025_수시_모집요강.pdf' },
  ]);

  const [fileEnter, setFileEnter] = useState(false);
  const [editFileName, setEditFileName] = useState<boolean[]>([false]);

  const [selected, setSelected] = useState<number | null>(null);

  const addToFiles = (uploadedFile: File | undefined) => {
    if (uploadedFile) {
      console.log('uploadedFile:', uploadedFile.name);
      setFiles((prev) => [
        ...prev,
        { no: prev.length + 1, title: uploadedFile.name.replace(/\..*/, ''), fileName: uploadedFile.name },
      ]);
      setEditFileName((prev) => new Array(prev.length + 1).fill(false));
    }
  };

  return (
    <ConsultingFileSettingsContext.Provider
      value={{
        files,
        setFiles,
        fileEnter,
        setFileEnter,
        editFileName,
        setEditFileName,
        selected,
        setSelected,
        addToFiles,
      }}
    >
      {children}
    </ConsultingFileSettingsContext.Provider>
  );
};

export default ConsultingFileSettingsProvider;
