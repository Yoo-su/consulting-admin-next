'use client';

import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { FocusEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { useConfirmToast } from '@/shared/hooks';

import { useConsultingFileSettings } from '../hooks';
import { ConsultingFile } from '../models';
import { getFileNoFromEvent } from '../services';
import { FileDownloader } from './file-downloader';
import { CustomWidthBoxCell, StyledTextField } from './table-components';

export const EditFile = ({ file }: { file: ConsultingFile }) => {
  const {
    files,
    setFiles,
    editFileIndex,
    setEditFileIndex,
    updateRefTitle,
    deleteFile,
  } = useConsultingFileSettings();
  const [origTitle, setOrigTitle] = useState<string>(file.RefTitle);

  const { openConfirmToast } = useConfirmToast();

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
    const newEditFileIndex = currentStatus
      ? [...editFileIndex]
      : new Array(editFileIndex.length).fill(false);
    newEditFileIndex[fileIndex - 1] = !currentStatus;
    setEditFileIndex(newEditFileIndex);

    if (!currentStatus) return;

    // currentStatus가 true일 때만 title을 저장
    if (currentStatus) {
      const title = (
        document.getElementById(`textField-${fileIndex}`) as HTMLInputElement
      )?.value;
      const trimmedValue = title.trim();
      if (!trimmedValue || trimmedValue === origTitle) return;
      if (trimmedValue.length > 30) {
        toast.error(
          <Typography variant="body2">
            자료명은 30자 이내로 입력해주세요
          </Typography>
        );
        setOrigTitle(origTitle);
        resetFileList(fileIndex, origTitle);
        return;
      }
      if (title !== trimmedValue) {
        // title에 좌우공백만 추가된 경우 공백 없는 title로 변경
        setOrigTitle(trimmedValue);
        resetFileList(fileIndex, trimmedValue);
        return;
      }
      updateRefTitle(fileIndex, trimmedValue, origTitle);
    }
  };

  const handleTextInput = (
    event:
      | MouseEvent<HTMLElement>
      | FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    //console.log('files', files, fileIndex);
    openConfirmToast(
      `"${files[fileIndex - 1].FileName}" 를 삭제하시겠습니까?`,
      () => deleteFile(files, fileIndex)
    );
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
      <CustomWidthBoxCell
        size="m"
        style={{ minWidth: '350px', paddingLeft: '5px', paddingRight: '5px' }}
      >
        <StyledTextField
          id={`textField-${file.RefNo}`}
          value={file.RefTitle}
          fullWidth
          disabled={!editFileIndex[file.RefNo - 1]}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disableRipple
                  onClick={handleTextInput}
                  edge="start"
                  id={`${file.RefNo}`}
                >
                  {editFileIndex[file.RefNo - 1] ? <DoneIcon /> : <EditIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="standard"
          onBlur={handleTextInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          sx={{
            '& .MuiInputBase-input': {
              width: 'calc(100%)',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            },
          }}
        />
      </CustomWidthBoxCell>
      <FileDownloader fileName={file.FileName} />
      <CustomWidthBoxCell size="s" style={{ paddingLeft: 0 }}>
        <IconButton
          disableRipple
          onClick={handleDeleteFile}
          id={`deleteFile-${file.RefNo}`}
        >
          <ClearIcon color="warning" fontSize="small" />
        </IconButton>
      </CustomWidthBoxCell>
    </>
  );
};
