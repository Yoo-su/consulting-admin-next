import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const StyledTextField = styled(TextField)({
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

export const UploadDivWrapper = styled('div')({
  width: '100%',
  textAlign: 'center',
});

interface DirectoryInputProps {
  webkitdirectory?: string | boolean;
  directory?: string | boolean;
}

export const HiddenFileInput = styled('input')<DirectoryInputProps>({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
