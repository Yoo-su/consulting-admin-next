import { QRCodeCanvas } from 'qrcode.react';
import { useMemo } from 'react';

type QRCodeBoxProps = {
  url: string;
  fileName: string;
};
export const QRCodeBox = ({ url, fileName }: QRCodeBoxProps) => {
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

  const QRCodeMemoized = useMemo(
    () => (
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
    ),
    [url]
  );

  return QRCodeMemoized;
};
