'use client';

import { createContext, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { useGetConsultingFileList } from '../hooks/use-get-consulting-file-list';
import { ConsultingFile, UploadFile } from '../types/consulting-file';
import { useUnivService } from '../hooks/context/use-univ-service';
import { useUploadConsultingFileMutation } from '@/features/dashboard/hooks/tanstack/use-upload-consulting-file-mutation';
import toast, { Toast } from 'react-hot-toast';
import { removeFileExtention } from '../services/consulting-files-setting/get-replaced-string';
import {
  useDeleteConsultingFileMutation,
  useUpdateConsultingRefNoMutation,
  useUpdateConsultingRefTitleMutation,
} from '../hooks/tanstack/use-update-consulting-file-mutation';
import { DeleteConsultingFileParams } from '../apis/delete-consulting-file';
import { UpdateConsultingRefTitleParams } from '../apis/update-consulting-file-reftitle';
import { Stack, TextField, Typography } from '@mui/material';

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

const ConsultingFileSettingsProvider = ({ children }: PropsWithChildren) => {
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
    uploadMutation(newFile).then((res) => {
      if (res.data.statusCode === 200) {
        toast.success(<Typography variant="body2">{newFile.File.name}를 성공적으로 업로드하였습니다</Typography>);
        execute();
      } else {
        toast.error(<Typography variant="body2">{newFile.File.name} 업로드 중 문제가 발생했습니다</Typography>);
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
    const StyledTextField = ({ title }: { title: string }) => {
      return (
        <TextField
          variant="standard"
          disabled
          value={title}
          size="small"
          sx={{
            width: '100%',
            wordBreak: 'break-all',
            '& .Mui-disabled': { color: 'black !important' },
            marginLeft: '1rem',
            '& input': { fontSize: '.8rem', textAlign: 'center' },
          }}
        />
      );
    };
    const customToast = (t: Toast) => {
      return (
        <Stack direction={'column'} spacing={2} sx={{ padding: '0 16px 8px 16px', width: '100%' }}>
          <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            자료명을 수정하였습니다.
          </Typography>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="subtitle2" sx={{ width: '100px' }}>
              이전 값:{' '}
            </Typography>
            <StyledTextField title={origTitle} />
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="subtitle2" sx={{ width: '100px' }}>
              수정 값:{' '}
            </Typography>
            <StyledTextField title={refTitle} />
          </Stack>
        </Stack>
      );
    };
    // `자료명을 수정하였습니다\n\n이전 값: ${origTitle}\n수정 값: ${refTitle}`
    let result = false;
    updateRefTitleMutation(params).then((res) => {
      if (res.status === 200) {
        execute();
        toast((t) => customToast(t), {
          duration: 5000,
          style: {
            maxWidth: '500px',
            width: '100%',
          },
        });
        result = true;
      } else {
        toast.error(<Typography variant="body2">`자료명 [${origTitle}]을 변경 중 문제가 발생했습니다`</Typography>);
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
    const fileName = files.find((file) => file.RefNo === refNo)?.FileName;
    deleteMutation(params).then((res) => {
      if (res.status === 204) {
        toast.success(<Typography variant="body2">`${fileName} 삭제를 성공적으로 마쳤습니다`</Typography>);
        execute();
      } else {
        toast.error(<Typography variant="body2">`${fileName} 삭제 중 문제가 발생했습니다`</Typography>);
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
