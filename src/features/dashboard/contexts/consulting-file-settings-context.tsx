'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useGetConsultingFileList } from '../hooks/use-get-consulting-file-list';
import { ConsultingFile, UploadFile } from '../types/consulting-file';
import { useUnivService } from '../hooks/use-univ-service';
import { useUploadConsultingFileMutation } from '@/features/dashboard/hooks/tanstack/use-upload-consulting-file-mutation';
import toast from 'react-hot-toast';
import { removeFileExtention } from '../components/consulting-files-setting/services/get-replaced-string';
import {
  useDeleteConsultingFileMutation,
  useUpdateConsultingRefNoMutation,
} from '../hooks/tanstack/use-update-consulting-file-mutation';
import { DeleteConsultingFileParams } from '../apis/delete-consulting-file';

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
  updateRefNo: (startIndex: number, endIndex: number) => void;
  deleteFile: (refNo: number) => void;
};

export const ConsultingFileSettingsContext = createContext<ConsultingFileSettingsContextValue | null>(null);

type ConsultingFileSettingsProvider = {
  children: ReactNode;
};

const ConsultingFileSettingsProvider = ({ children }: ConsultingFileSettingsProvider) => {
  //#region  hooks
  const { mutateAsync: uploadMutation } = useUploadConsultingFileMutation();
  const { mutateAsync: updateRefNoMutation } = useUpdateConsultingRefNoMutation();
  const { mutateAsync: deleteMutation } = useDeleteConsultingFileMutation();

  const { currentService } = useUnivService();
  const serviceID = currentService?.serviceID || '';

  const { files, setFiles, execute } = useGetConsultingFileList(serviceID);

  const [editFileIndex, setEditFileIndex] = useState<boolean[]>([false]);
  const [selected, setSelected] = useState<number | null>(null);
  //#endregion hooks

  const uploadFile = (newFile: UploadFile) => {
    console.log('newFile:', newFile);
    uploadMutation(newFile).then((res) => {
      if (res.data.statusCode === 200) {
        toast.success(`${newFile.File.name} 파일 업로드를 성공적으로 마쳤습니다`);
        execute();
      } else {
        toast.error(`${newFile.File.name} 파일 업로드 중 문제가 발생했습니다`);
      }
    });
  };

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

  const editFileName = (index: number, editedFile: ConsultingFile) => {};

  const updateRefNo = async (startIndex: number, endIndex: number) => {
    await updateRefNoMutation({ ServiceID: parseInt(serviceID), oldRefNo: startIndex, newRefNo: endIndex });
    execute();
  };

  const deleteFile = (refNo: number) => {
    const params: DeleteConsultingFileParams = {
      ServiceID: parseInt(serviceID),
      RefNo: refNo,
    };
    deleteMutation(params).then((res) => {
      if (res.data.statusCode === 200) {
        execute();
        toast.success(`${refNo} 파일 삭제를 성공적으로 마쳤습니다`);
      } else {
        toast.error(`${refNo} 파일 삭제 중 문제가 발생했습니다`);
      }
    });
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
        updateRefNo,
        deleteFile,
      }}
    >
      {children}
    </ConsultingFileSettingsContext.Provider>
  );
};

export default ConsultingFileSettingsProvider;
