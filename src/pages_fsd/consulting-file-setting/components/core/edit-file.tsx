'use client';

import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useConsultingFileSettings, useFileEditHandler } from '../../hooks';
import { ConsultingFile } from '../../models';
import {
  CustomWidthBoxCell,
  FileDownloader,
  StyledTextField,
} from '../elements';

export const EditFile = ({ file }: { file: ConsultingFile }) => {
  const { editFileIndex } = useConsultingFileSettings();
  const { handleTextInput, handleChange, handleKeyDown, handleDeleteFile } =
    useFileEditHandler({ file });

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
