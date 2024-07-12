import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AppHistory } from '@/features/dashboard/types/app-history.type';
import { formatKoreanTextCompareDatesFromNow } from '@/shared/services/get-formatted-date';
import FileItemCard from '@/shared/components/file-item-card';
import { apiUrls } from '@/shared/constants/api-urls';
import toast from 'react-hot-toast';
import { Box, Modal, Stack } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';

type AppProgDataProps = {
  history: AppHistory;
};

const AppProgData = ({ history }: AppProgDataProps) => {
  const [open, setOpen] = useState(false);
  const getDownloadUrl = (history: AppHistory) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${apiUrls.dashboard.getAppDownloadUrl}/${history.serviceID}/${history.osType}/${history.version}`;
  };

  const handleClickCard = (url: string) => {
    setOpen(true);
    try {
      navigator.clipboard.writeText(url).then(() => {
        toast.success(<Typography variant="body2">앱 다운로드 링크가 복사되었습니다</Typography>);
      });
    } catch (e) {
      toast.error(<Typography variant="body2">복사에 실패했습니다</Typography>);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid key={history.uploadTime} item xs={12} sm={6} md={3} lg={3} xl={3}>
        <FileItemCard tooltipMsg={'다운로드 링크 복사'} handleClick={() => handleClickCard(getDownloadUrl(history))}>
          <FileItemCard.IconBox file={history.osType === 'A' ? 'apk' : 'exe'} />
          <FileItemCard.ContentBox>
            {history.packageFileName && <FileItemCard.TitleBox title={history.packageFileName} />}
            <FileItemCard.AdditionalInfo
              sxProps={{
                justifyContent: 'flex-end',
              }}
            >
              <Typography variant="caption" color="grey.500" textAlign="right">
                {formatKoreanTextCompareDatesFromNow(history.uploadTime)}
              </Typography>
            </FileItemCard.AdditionalInfo>
          </FileItemCard.ContentBox>
        </FileItemCard>
      </Grid>
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
            <Typography variant="body2">QR코드를 클릭하여 다운로드하세요</Typography>
          </Stack>
          <QRCodeBox url={getDownloadUrl(history)} fileName={history.packageFileName ?? 'qrcode'} />
          <Typography variant="caption" maxWidth={250} sx={{ wordWrap: 'break-word' }}>
            {getDownloadUrl(history)}
          </Typography>
        </Stack>
      </Modal>
    </>
  );
};
export default AppProgData;

type QRCodeBoxProps = {
  url: string;
  fileName: string;
};

const QRCodeBox = ({ url, fileName }: QRCodeBoxProps) => {
  const handleClick = () => {
    const canvas = document.querySelector('canvas');
    const url = canvas ? canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream') : '';
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
        src: '/logo.svg',
        x: undefined,
        y: undefined,
        height: 20,
        width: 50,
        excavate: true,
      }}
    />
  );
};
