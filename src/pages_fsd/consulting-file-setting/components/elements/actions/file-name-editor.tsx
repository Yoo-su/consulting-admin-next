import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, InputAdornment } from '@mui/material';

import { NameEditorClass } from '@/pages_fsd/consulting-file-setting/constants';
import {
  useConsultingFileSettings,
  useFileEditHandler,
} from '@/pages_fsd/consulting-file-setting/hooks';
import { ConsultingFile } from '@/pages_fsd/consulting-file-setting/models';

import { StyledTextField } from '../cells';

type FileNameEditorProps = {
  file: ConsultingFile;
};

export const FileNameEditor = ({ file }: FileNameEditorProps) => {
  const { editFileIndex } = useConsultingFileSettings();
  const { handleTextInput, handleChange, handleKeyDown } = useFileEditHandler({
    file,
  });

  return (
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
      sx={NameEditorClass}
    />
  );
};
