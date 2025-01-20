'use client';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { MouseEvent, useState } from 'react';

import { QrModal } from '../qr-modal/qr-modal';

type URlAddressTextFieldProps = {
  url: string;
  id: string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const URlAddressTextField = ({
  url,
  id,
  handleClick,
}: URlAddressTextFieldProps) => {
  const [open, setOpen] = useState(false);
  const handleQrClick = () => {
    setOpen(true);
  };
  return (
    <>
      <TextField
        disabled
        fullWidth
        value={url}
        InputProps={{
          endAdornment: (
            <>
              <Tooltip title="QR 코드" placement="top">
                <InputAdornment position="end">
                  <IconButton
                    disableRipple
                    aria-label="copy text"
                    onClick={handleQrClick}
                    id={id}
                  >
                    <QrCode2Icon />
                  </IconButton>
                </InputAdornment>
              </Tooltip>
              <Tooltip title="주소 복사" placement="top">
                <InputAdornment position="end">
                  <IconButton
                    disableRipple
                    aria-label="copy text"
                    onClick={handleClick}
                    id={id}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              </Tooltip>
            </>
          ),
        }}
      />
      <QrModal
        open={open}
        handleClose={() => setOpen(false)}
        fileName={`qr-pwa-${id}`}
        url={url}
      />
    </>
  );
};
