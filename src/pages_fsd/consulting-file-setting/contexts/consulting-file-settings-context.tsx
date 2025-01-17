'use client';

import { Stack, TextField, Typography } from '@mui/material';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { useSharedStore } from '@/shared/models';

import {
  useDeleteConsultingFileMutation,
  useGetConsultingFileList,
  useUpdateConsultingRefNoMutation,
  useUpdateConsultingRefTitleMutation,
  useUploadConsultingFileMutation,
} from '../hooks';
import { ConsultingFile } from '../models';
import { removeFileExtention } from '../services';

export type ConsultingFileSettingsContextValue = {
  files: ConsultingFile[];
  setFiles: Dispatch<SetStateAction<ConsultingFile[]>>;
  editFileIndex: boolean[];
  setEditFileIndex: Dispatch<SetStateAction<boolean[]>>;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
  addToFiles: (uploadedFile: File | undefined) => void;
  updateRefTitle: (refNo: number, refTitle: string, origTitle: string) => void;
  updateRefNo: (
    fileList: ConsultingFile[],
    startIndex: number,
    endIndex: number
  ) => void;
  deleteFile: (fileList: ConsultingFile[], refNo: number) => void;
};

export const ConsultingFileSettingsContext =
  createContext<ConsultingFileSettingsContextValue | null>(null);

export const ConsultingFileSettingsProvider = ({
  children,
}: PropsWithChildren) => {
  const { mutateAsync: uploadMutation } = useUploadConsultingFileMutation();
  const { mutateAsync: updateRefNoMutation } =
    useUpdateConsultingRefNoMutation();
  const { mutateAsync: deleteMutation } = useDeleteConsultingFileMutation();
  const { mutateAsync: updateRefTitleMutation } =
    useUpdateConsultingRefTitleMutation();

  const { currentService } = useSharedStore();
  const serviceID = currentService?.serviceID || '';
  const { files, setFiles, execute } = useGetConsultingFileList(serviceID);

  const [editFileIndex, setEditFileIndex] = useState<boolean[]>([false]);
  const [selected, setSelected] = useState<number | null>(null);

  const addToFiles = useCallback(
    (uploadedFile: File | undefined) => {
      if (!uploadedFile) return;
      const fileName = uploadedFile.name;
      return toast.promise(
        uploadMutation({
          ServiceID: serviceID,
          RefTitle: removeFileExtention(fileName),
          File: uploadedFile,
        }),
        {
          loading: (
            <Typography variant="body2">
              {fileName}을 업로드 중입니다
            </Typography>
          ),
          success: () => {
            execute();
            setEditFileIndex((prev) => new Array(prev.length + 1).fill(false));
            return (
              <Typography variant="body2">
                {fileName}을 업로드하였습니다
              </Typography>
            );
          },
          error: (
            <Typography variant="body2">
              {fileName} 업로드 중 문제가 발생했습니다
            </Typography>
          ),
        }
      );
    },
    [serviceID]
  );

  const updateRefTitle = useCallback(
    (refNo: number, refTitle: string, origTitle: string) => {
      if (refTitle === origTitle) return;
      return toast.promise(
        updateRefTitleMutation({
          ServiceID: parseInt(serviceID),
          RefNo: refNo,
          RefTitle: refTitle,
        }),
        {
          loading: (
            <Typography variant="body2">
              자료명 [{origTitle}]을 변경 중입니다
            </Typography>
          ),
          success: () => {
            execute();
            setFiles(resetFileList(files, refNo, refTitle));
            return customToast(refTitle, origTitle);
          },
          error: () => {
            setFiles(resetFileList(files, refNo, origTitle));
            return (
              <Typography variant="body2">
                [ {origTitle} ] 을 {<br />}[ {refTitle} ] 으로 변경 중 문제가
                발생했습니다
              </Typography>
            );
          },
        },
        {
          success: {
            duration: 5000,
            style: {
              maxWidth: '500px',
              width: '100%',
            },
          },
        }
      );
    },
    [files]
  );

  const updateRefNo = useCallback(
    (fileList: ConsultingFile[], startIndex: number, endIndex: number) => {
      const [origFiles, newFiles] = reorder(
        fileList,
        startIndex - 1,
        endIndex - 1
      );
      setFiles(newFiles);
      return toast.promise(
        updateRefNoMutation({
          ServiceID: parseInt(serviceID),
          oldRefNo: startIndex,
          newRefNo: endIndex,
        }),
        {
          loading: (
            <Typography variant="body2">자료 순서를 변경 중입니다</Typography>
          ),
          success: () => {
            execute();
            return (
              <Typography variant="body2">
                자료 순서를 변경하였습니다
              </Typography>
            );
          },
          error: () => {
            setFiles(origFiles);
            return (
              <Typography variant="body2">
                자료 순서를 변경하는 중 문제가 발생했습니다
              </Typography>
            );
          },
        }
      );
    },
    [serviceID]
  );

  const deleteFile = useCallback(
    (fileList: ConsultingFile[], refNo: number) => {
      const fileName = fileList.find((file) => file.RefNo === refNo)?.FileName;
      return toast.promise(
        deleteMutation({
          ServiceID: parseInt(serviceID),
          RefNo: refNo,
        }),
        {
          loading: (
            <Typography variant="body2">{fileName} 삭제 중입니다</Typography>
          ),
          success: () => {
            execute();
            return (
              <Typography variant="body2">
                {fileName}를 삭제했습니다.
              </Typography>
            );
          },
          error: (
            <Typography variant="body2">
              {fileName} 삭제 중 문제가 발생했습니다
            </Typography>
          ),
        }
      );
    },
    [serviceID]
  );

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
        updateRefTitle,
        updateRefNo,
        deleteFile,
      }}
    >
      {children}
    </ConsultingFileSettingsContext.Provider>
  );
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
        paddingBottom: '1px',
        '& .Mui-disabled': { color: 'black !important', paddingLeft: '1px' },
        marginLeft: '1rem',
        '& input': { fontSize: '.8rem' },
      }}
    />
  );
};

const customToast = (refTitle: string, origTitle: string) => {
  return (
    <Stack
      direction={'column'}
      spacing={2}
      sx={{ padding: '0 16px 8px 16px', width: '100%' }}
    >
      <Typography variant="subtitle2">자료명을 수정하였습니다.</Typography>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="subtitle2" sx={{ width: '60px' }}>
          이전 값:{' '}
        </Typography>
        <StyledTextField title={origTitle} />
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="subtitle2" sx={{ width: '60px' }}>
          수정 값:{' '}
        </Typography>
        <StyledTextField title={refTitle} />
      </Stack>
    </Stack>
  );
};

const reorder = (
  list: ConsultingFile[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return [list, result];
};

const resetFileList = (
  list: ConsultingFile[],
  fileIndex: number,
  title: string
) => {
  return list.map((file) => {
    if (file.RefNo === fileIndex) {
      return { ...file, RefTitle: title };
    } else {
      return file;
    }
  });
};
