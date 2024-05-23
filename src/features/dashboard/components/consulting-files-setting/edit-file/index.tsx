'use client';

import { MouseEvent, FocusEvent } from 'react';

import InputAdornment from '@mui/material/InputAdornment';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

import { useConsultingFileSettings } from '@/features/dashboard/hooks/use-consulting-file-settings';
import { ConsultingFile } from '@/features/dashboard/types/consulting-file';
import { getFileNoFromEvent } from '@/features/dashboard/components/consulting-files-setting/services/get-replaced-string';
import { CustomWidthBoxCell } from '../table-components/table-boxes';
import { StyledTextField } from '../table-components/styled-component';

const EditFile = ({ file }: { file: ConsultingFile }) => {
  const { files, setFiles, editFileIndex, setEditFileIndex, editFileName, deleteFile } = useConsultingFileSettings();

  const editFileTitle = (index: number) => {
    const currentStatus = editFileIndex[index];
    let newEditFileIndex = [...editFileIndex];

    // currentStatus가 true일 때만 title을 저장
    if (currentStatus) {
      const title = (document.getElementById(`textField-${index + 1}`) as HTMLInputElement)?.value;
      if (title) {
        const editedFile = { ...file, RefTitle: title };
        editFileName(index, editedFile);
        setFiles(files); // TODO: 나중에 setFiles 전부 삭제하기
      }
    } else {
      // 현재 클릭한 index만 true로 변경하기 위해 false로 초기화
      newEditFileIndex = new Array(editFileIndex.length).fill(false);
    }
    newEditFileIndex[index] = !currentStatus;
    setEditFileIndex(newEditFileIndex);
  };
  const handleEditFileName = (event: MouseEvent<HTMLElement> | FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const index = getFileNoFromEvent(event.currentTarget.id);
    editFileTitle(index - 1);
  };
  const handleChange = (event: FocusEvent<HTMLInputElement>) => {
    const newFile = files.map((file) => {
      if (file.RefNo === getFileNoFromEvent(event.currentTarget.id)) {
        return { ...file, RefTitle: event.target.value };
      }
      return file;
    });
    setFiles(newFile);
  };

  const handleDeleteFile = (event: MouseEvent<HTMLElement>) => {
    const index = parseInt(event.currentTarget.id);

    deleteFile(index);
    // const newFiles = files.filter((file) => file.RefNo !== index).map((file, index) => ({ ...file, RefNo: index + 1 }));
    // // TODO: deleteFile(newFiles);
    // setFiles(newFiles);
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
                <IconButton disableRipple onClick={handleEditFileName} edge="start" id={`${file.RefNo}`}>
                  {editFileIndex[file.RefNo - 1] ? <DoneIcon /> : <EditIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="standard"
          onBlur={handleEditFileName}
          onChange={handleChange}
        />
      </CustomWidthBoxCell>
      <CustomWidthBoxCell size="m" typo={true}>
        {file.FileName}
      </CustomWidthBoxCell>
      <CustomWidthBoxCell size="s">
        <IconButton disableRipple onClick={handleDeleteFile} id={`${file.RefNo}`}>
          <ClearIcon color="warning" fontSize="small" />
        </IconButton>
      </CustomWidthBoxCell>
    </>
  );
};

export default EditFile;
