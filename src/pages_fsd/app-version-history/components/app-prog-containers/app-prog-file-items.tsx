import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { FileItemCard } from '@/shared/components';
import { formatKoreanTextCompareDatesFromNow } from '@/shared/services';

import { Dispatch, SetStateAction } from 'react';
import { OS_TYPE } from '../../constants';
import { AppHistory } from '../../models';
import { copyText, getAppDownloadUrl } from '../../services';

type AppProgFileItemsProps = {
  history: AppHistory;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AppProgFileItems = ({
  history,
  setOpen,
}: AppProgFileItemsProps) => {
  const handleClickCard = async (url: string) => {
    setOpen(true);
    await copyText(url, '앱 다운로드 링크가');
  };

  return (
    <Grid key={history.uploadTime} item xs={12} sm={6} md={3} lg={3} xl={3}>
      <FileItemCard
        tooltipMsg={'다운로드 링크 복사'}
        handleClick={() => handleClickCard(getAppDownloadUrl(history))}
      >
        <FileItemCard.IconBox
          file={history.osType === OS_TYPE.APK ? 'apk' : 'exe'}
        />
        <FileItemCard.ContentBox>
          {history.packageFileName && (
            <FileItemCard.TitleBox title={history.packageFileName} />
          )}
          <FileItemCard.AdditionalInfo sxProps={{ justifyContent: 'flex-end' }}>
            <Typography variant="caption" color="grey.500" textAlign="right">
              {formatKoreanTextCompareDatesFromNow(history.uploadTime)}
            </Typography>
          </FileItemCard.AdditionalInfo>
        </FileItemCard.ContentBox>
      </FileItemCard>
    </Grid>
  );
};
