import { MouseEvent } from 'react';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type URlAddressTextFieldProps = {
  url: string;
  id: string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const URlAddressTextField = ({ url, id, handleClick }: URlAddressTextFieldProps) => {
  return (
    <TextField
      disabled
      fullWidth
      value={url}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton disableRipple aria-label="copy text" onClick={handleClick} id={id}>
              <ContentCopyIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default URlAddressTextField;
