'use client';

import { MouseEvent, FocusEvent } from 'react';

import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

import { styled } from '@mui/material/styles';
import { useConsultingFileSettings } from '@/features/dashboard/hooks/use-consulting-file-settings';
import { UploadedFile } from '@/features/dashboard/contexts/consulting-file-settings-context';

const EditFile = ({ file }: { file: UploadedFile }) => {
  const { files, setFiles, editFileName, setEditFileName } = useConsultingFileSettings();

  const editFileTitle = (index: number) => {
    const currentStatus = editFileName[index];
    let newEditFileName = [...editFileName];

    // currentStatus가 true일 때만 title을 저장
    if (currentStatus) {
      const title = (document.getElementById(`textField-${index + 1}`) as HTMLInputElement)?.value;
      if (title) {
        const newFiles = [...files];
        newFiles[index].title = title;
        setFiles(newFiles);
      }
    } else {
      // 현재 클릭한 index만 true로 변경하기 위해 false로 초기화
      newEditFileName = new Array(editFileName.length).fill(false);
    }
    newEditFileName[index] = !currentStatus;
    setEditFileName(newEditFileName);
  };
  const handleEditFileName = (event: MouseEvent<HTMLElement> | FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const index = parseInt(event.currentTarget.id.replace('textField-', ''));
    editFileTitle(index - 1);
  };
  const handleDeleteFile = (event: MouseEvent<HTMLElement>) => {
    const index = parseInt(event.currentTarget.id);
    const newFiles = files.filter((file) => file.no !== index);

    setFiles(newFiles.map((file, index) => ({ ...file, no: index + 1 })));
  };

  /* styled components */
  const StyledTextField = styled(TextField)({
    '& .MuiInput-root': {
      '&.Mui-disabled:before': {
        border: '0px solid black',
      },
      '&.Mui-disabled:hover:before': {
        border: '0px solid black',
      },
      '&:before': {
        borderBottom: '1px solid #1976d2',
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #1976d2',
      },
    },
    '& .MuiInput-input': {
      fontSize: '0.875rem',
    },
    '& .Mui-disabled': {
      WebkitTextFillColor: '#777 !important',
      letterSpacing: '0.1rem',
      '& .MuiSvgIcon-root': {
        width: '.8rem',
        color: '#9e9e9e',
      },
    },
    '& .MuiSvgIcon-root': {
      width: '1rem',
      color: '#1976d2',
    },
  });
  return (
    <>
      <TableCell>
        <IconButton disableRipple sx={{ width: '5px' }}>
          <DragHandleIcon fontSize="small" />
        </IconButton>
      </TableCell>
      <TableCell align="center">{file.no}</TableCell>
      <TableCell>
        <StyledTextField
          id={`textField-${file.no}`}
          defaultValue={file.title}
          fullWidth
          disabled={!editFileName[file.no - 1]}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disableRipple onClick={handleEditFileName} edge="start" id={file.no.toString()}>
                  {editFileName[file.no - 1] ? <DoneIcon /> : <EditIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="standard"
          onBlur={handleEditFileName}
        />
      </TableCell>
      <TableCell>{file.fileName}</TableCell>
      <TableCell align="center">
        <IconButton disableRipple onClick={handleDeleteFile} id={file.no.toString()}>
          <ClearIcon color="warning" fontSize="small" />
        </IconButton>
      </TableCell>
    </>
  );
};

export default EditFile;
