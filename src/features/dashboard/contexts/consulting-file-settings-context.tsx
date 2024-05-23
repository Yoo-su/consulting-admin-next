'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useGetConsultingFileList } from '../hooks/use-get-consulting-file-list';
import { ConsultingFile, UploadFile } from '../types/consulting-file';
import { useUnivService } from '../hooks/use-univ-service';
import { useUploadConsultingFileMutation } from '@/features/dashboard/hooks/tanstack/use-upload-consulting-file-mutation';
import toast from 'react-hot-toast';
import { removeFileExtention } from '../components/consulting-files-setting/services/get-replaced-string';

export type ConsultingFileSettingsContextValue = {
  files: ConsultingFile[];
  setFiles: Dispatch<SetStateAction<ConsultingFile[]>>;
  editFileIndex: boolean[];
  setEditFileIndex: Dispatch<SetStateAction<boolean[]>>;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  addToFiles: (uploadedFile: File | undefined) => void;
  uploadFile: (newFile: ConsultingFile) => void;
  editFileName: (index: number, editedFile: ConsultingFile) => void;
};

export const ConsultingFileSettingsContext = createContext<ConsultingFileSettingsContextValue | null>(null);

type ConsultingFileSettingsProvider = {
  children: ReactNode;
};

const ConsultingFileSettingsProvider = ({ children }: ConsultingFileSettingsProvider) => {
  const { mutateAsync } = useUploadConsultingFileMutation();
  const { currentService } = useUnivService();
  const serviceID = currentService?.serviceID || '';
  const { files, setFiles, execute } = useGetConsultingFileList(serviceID);

  const [editFileIndex, setEditFileIndex] = useState<boolean[]>([false]);

  const [selected, setSelected] = useState<number | null>(null);

  const uploadFile = (newFile: UploadFile) => {
    console.log('newFile:', newFile);
    mutateAsync(newFile).then((res) => {
      if (res.data.statusCode === 200) {
        toast.success(`${newFile.File.name} 파일 업로드를 성공적으로 마쳤습니다`);
        execute();
      } else {
        toast.error(`${newFile.File.name} 파일 업로드 중 문제가 발생했습니다`);
      }
    });
  };
  const editFileName = (index: number, editedFile: ConsultingFile) => {};

  const addToFiles = (uploadedFile: File | undefined) => {
    if (uploadedFile) {
      console.log('uploadedFile:', uploadedFile.name);
      const newFile = {
        ServiceID: serviceID,
        RefTitle: removeFileExtention(uploadedFile.name),
        File: uploadedFile,
      };
      uploadFile(newFile);
      setEditFileIndex((prev) => new Array(prev.length + 1).fill(false));
    }
  };

  return (
    <ConsultingFileSettingsContext.Provider
      value={{
        files,
        setFiles,
        editFileIndex,
        setEditFileIndex,
        selected,
        setSelected,
        addToFiles,
        uploadFile,
        editFileName,
      }}
    >
      {children}
    </ConsultingFileSettingsContext.Provider>
  );
};

export default ConsultingFileSettingsProvider;
