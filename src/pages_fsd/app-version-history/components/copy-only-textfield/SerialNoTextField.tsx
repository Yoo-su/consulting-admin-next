import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { MouseEvent } from 'react';

type CopyOnlyTextFieldProps = {
  serviceID: string;
  value: string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const SerialNoTextField = ({
  serviceID,
  value,
  handleClick,
}: CopyOnlyTextFieldProps) => {
  return (
    <TextField
      disabled
      size="small"
      label="시리얼번호"
      sx={{
        minWidth: '350px',
        textWrap: 'noWrap',
        '& .Mui-disabled': { color: 'black !important' },
      }}
      value={value}
      id={`${serviceID}-serialnumber`}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disableRipple
              aria-label="copy text"
              onClick={handleClick}
              id="serialnumber"
            >
              <ContentCopyIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
