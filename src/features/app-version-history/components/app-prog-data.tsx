import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import toast from 'react-hot-toast';

import FileItemCard from '@/shared/components/ui/file-item-card';
import { API_URLS } from '@/shared/constants';
import { formatKoreanTextCompareDatesFromNow } from '@/shared/services';

import { AppHistory } from '../models';
import QrModal from './qr-modal';

type AppProgDataProps = {
  history: AppHistory;
};

const AppProgData = ({ history }: AppProgDataProps) => {
  const [open, setOpen] = useState(false);

  const handleClickCard = (url: string) => {
    setOpen(true);
    try {
      navigator.clipboard.writeText(url).then(() => {
        toast.success(
          <Typography variant="body2">
            앱 다운로드 링크가 복사되었습니다
          </Typography>
        );
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
        <FileItemCard
          tooltipMsg={'다운로드 링크 복사'}
          handleClick={() => handleClickCard(getDownloadUrl(history))}
        >
          <FileItemCard.IconBox file={history.osType === 'A' ? 'apk' : 'exe'} />
          <FileItemCard.ContentBox>
            {history.packageFileName && (
              <FileItemCard.TitleBox title={history.packageFileName} />
            )}
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
      <QrModal
        open={open}
        handleClose={handleClose}
        fileName={history.packageFileName}
        url={getDownloadUrl(history)}
      />
    </>
  );
};
export default AppProgData;

export const getDownloadUrl = (history: AppHistory) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${API_URLS.dashboard.getAppDownloadUrl}/${history.serviceID}/${history.osType}/${history.version}`;
};
