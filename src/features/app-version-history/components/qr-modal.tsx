import { Modal, Stack, Typography } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

type QrModalProps = {
  open: boolean;
  handleClose: () => void;
  fileName: string | null;
  url: string;
};

const QrModal = ({ open, handleClose, fileName, url }: QrModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 250,
          bgcolor: 'background.paper',
          // boxShadow: 24,
          borderRadius: 3,
          p: 4,
          outline: 'none !important',
        }}
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

export default QrModal;

type QRCodeBoxProps = {
  url: string;
  fileName: string;
};

const QRCodeBox = ({ url, fileName }: QRCodeBoxProps) => {
  const handleClick = () => {
    const canvas = document.querySelector('canvas');
    const url = canvas
      ? canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      : '';
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-${fileName}.png`;

    // Add attributes to remove border
    link.style.border = 'none';
    link.style.outline = 'none';
    link.style.textDecoration = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <QRCodeCanvas
      value={url}
      size={250}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      imageSettings={{
        src: '/logo-nopadding.png',
        x: undefined,
        y: undefined,
        height: 40,
        width: 32,
        excavate: false,
      }}
    />
  );
};
