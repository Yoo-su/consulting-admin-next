'use client';

import { Modal, Stack, Typography } from '@mui/material';
import { QrModalClass } from '../../constants';
import { QRCodeBox } from './qr-code-box';

type QrModalProps = {
  open: boolean;
  handleClose: () => void;
  fileName: string | null;
  url: string;
};

export const QrModal = ({ open, handleClose, fileName, url }: QrModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        sx={QrModalClass}
        alignItems={'center'}
        direction={'column'}
        spacing={3}
      >
        <Stack alignItems={'center'}>
          <Typography variant="h5">QR코드 저장</Typography>
          <Typography variant="body2">
            QR코드를 클릭하여 다운로드하세요
          </Typography>
        </Stack>
        <QRCodeBox url={url} fileName={fileName ?? 'qrcode'} />
        <Typography
          variant="caption"
          maxWidth={250}
          sx={{ wordWrap: 'break-word' }}
        >
          {url}
        </Typography>
      </Stack>
    </Modal>
  );
};
