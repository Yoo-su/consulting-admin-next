'use client';

import { MouseEvent, FocusEvent, KeyboardEvent, useState } from 'react';

import InputAdornment from '@mui/material/InputAdornment';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

import { useConsultingFileSettings } from '@/features/dashboard/hooks/context/use-consulting-file-settings';
import { ConsultingFile } from '@/features/dashboard/types/consulting-file';
import { getFileNoFromEvent } from '@/features/dashboard/services/consulting-files-setting/get-replaced-string';
import { CustomWidthBoxCell } from '../table-components/table-boxes';
import { StyledTextField } from '../table-components/styled-component';
import toast from 'react-hot-toast';

const EditFile = ({ file }: { file: ConsultingFile }) => {
  const { files, setFiles, editFileIndex, setEditFileIndex, updateRefTitle, deleteFile } = useConsultingFileSettings();
  const [origTitle, setOrigTitle] = useState<string>(file.RefTitle);

  //#region textfield
  const resetFileList = (fileIndex: number, title: string) => {
    const newFileList = files.map((file) => {
      if (file.RefNo === fileIndex) {
        return { ...file, RefTitle: title };
      } else {
        return file;
      }
    });
    setFiles(newFileList);
  };

  const editRefTitle = (fileIndex: number) => {
    const currentStatus = editFileIndex[fileIndex - 1];
    const newEditFileIndex = currentStatus ? [...editFileIndex] : new Array(editFileIndex.length).fill(false);
    newEditFileIndex[fileIndex - 1] = !currentStatus;
    setEditFileIndex(newEditFileIndex);

    if (!currentStatus) return;

    // currentStatus가 true일 때만 title을 저장
    if (currentStatus) {
      const title = (document.getElementById(`textField-${fileIndex}`) as HTMLInputElement)?.value;
      const trimmedValue = title.trim();

      let finalTitle = origTitle;
      if (trimmedValue) {
        if (trimmedValue.length > 30) {
          toast.error('자료명은 30자 이내로 입력해주세요');
        } else if (trimmedValue !== origTitle) {
          setOrigTitle(trimmedValue);
          if (updateRefTitle(fileIndex, trimmedValue, origTitle)) {
            finalTitle = trimmedValue;
          }
        } else if (title !== trimmedValue) {
          // title에 좌우공백만 추가된 경우 공백 없는 title로 변경
          finalTitle = trimmedValue;
        }
      }
      resetFileList(fileIndex, finalTitle);
    }
  };

  const handleTextInput = (event: MouseEvent<HTMLElement> | FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fileIndex = getFileNoFromEvent(event.currentTarget.id);
    editRefTitle(fileIndex);
  };

  const handleChange = (event: FocusEvent<HTMLInputElement>) => {
    const fileIndex = getFileNoFromEvent(event.currentTarget.id);
    const newTitle = event.target.value;
    resetFileList(fileIndex, newTitle);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      (event.target as HTMLInputElement).blur();
    }
  };
  //#endregion textfield

  const handleDeleteFile = (event: MouseEvent<HTMLElement>) => {
    const fileIndex = getFileNoFromEvent(event.currentTarget.id);

    deleteFile(fileIndex);
  };

  return (
    <>
      <CustomWidthBoxCell size="xs">
        <IconButton disableRipple sx={{ width: '5px' }}>
          <DragHandleIcon fontSize="small" />
        </IconButton>
      </CustomWidthBoxCell>
      <CustomWidthBoxCell size="s" typo={true}>
        {file.RefNo}
      </CustomWidthBoxCell>
      <CustomWidthBoxCell size="m">
        <StyledTextField
          id={`textField-${file.RefNo}`}
          value={file.RefTitle}
          fullWidth
          disabled={!editFileIndex[file.RefNo - 1]}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disableRipple onClick={handleTextInput} edge="start" id={`${file.RefNo}`}>
                  {editFileIndex[file.RefNo - 1] ? <DoneIcon /> : <EditIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="standard"
          onBlur={handleTextInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </CustomWidthBoxCell>
      <CustomWidthBoxCell size="m" typo={true}>
        {file.FileName}
      </CustomWidthBoxCell>
      <CustomWidthBoxCell size="s">
        <IconButton disableRipple onClick={handleDeleteFile} id={`deleteFile-${file.RefNo}`}>
          <ClearIcon color="warning" fontSize="small" />
        </IconButton>
      </CustomWidthBoxCell>
    </>
  );
};

export default EditFile;
