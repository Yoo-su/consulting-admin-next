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
  useUpdateConsultingRefTitleMutation,
} from '../hooks/tanstack/use-update-consulting-file-mutation';
import { DeleteConsultingFileParams } from '../apis/delete-consulting-file';
import { UpdateConsultingRefTitleParams } from '../apis/update-consulting-file-reftitle';

export type ConsultingFileSettingsContextValue = {
  files: ConsultingFile[];
  setFiles: Dispatch<SetStateAction<ConsultingFile[]>>;
  editFileIndex: boolean[];
  setEditFileIndex: Dispatch<SetStateAction<boolean[]>>;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  addToFiles: (uploadedFile: File | undefined) => void;
  uploadFile: (newFile: ConsultingFile) => void;
  updateRefTitle: (refNo: number, refTitle: string, origTitle: string) => boolean;
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
  const { mutateAsync: updateRefTitleMutation } = useUpdateConsultingRefTitleMutation();

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

  const updateRefTitle = (refNo: number, refTitle: string, origTitle: string) => {
    const params: UpdateConsultingRefTitleParams = {
      ServiceID: parseInt(serviceID),
      RefNo: refNo,
      RefTitle: refTitle,
    };
    const toastStyle = {
      whiteSpace: 'nowrap',
      maxWidth: 'none',
      padding: '16px',
    };
    let result = false;
    updateRefTitleMutation(params).then((res) => {
      if (res.status === 200) {
        execute();
        toast(`자료명을 수정하였습니다\n\n이전 값:   ${origTitle}\n수정 값:   ${refTitle}`, {
          style: toastStyle,
          duration: 5000,
        });
        result = true;
      } else {
        toast.error(`자료명 [${origTitle}]을 변경 중 문제가 발생했습니다`, { style: toastStyle });
        result = false;
      }
    });
    return result;
  };

  const updateRefNo = async (startIndex: number, endIndex: number) => {
    await updateRefNoMutation({ ServiceID: parseInt(serviceID), oldRefNo: startIndex, newRefNo: endIndex });
    execute();
  };

  const deleteFile = (refNo: number) => {
    const params: DeleteConsultingFileParams = {
      ServiceID: parseInt(serviceID),
      RefNo: refNo,
    };
    const fileName = files.find((file) => file.RefNo === refNo)?.RefTitle;
    deleteMutation(params).then((res) => {
      if (res.data.statusCode === 200) {
        execute();
        toast.success(`${fileName} 파일 삭제를 성공적으로 마쳤습니다`);
      } else {
        toast.error(`${fileName} 파일 삭제 중 문제가 발생했습니다`);
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
        updateRefTitle,
        updateRefNo,
        deleteFile,
      }}
    >
      {children}
    </ConsultingFileSettingsContext.Provider>
  );
};

export default ConsultingFileSettingsProvider;
