import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { memo, useCallback } from 'react';

import { BASE_LAYOUT_URL } from '../constants';

export const LayoutDownloadButton = memo(() => {
  const theme = useTheme();
  const downsm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDownloadLayout = useCallback(() => {
    const link = document.createElement('a');
    link.href = BASE_LAYOUT_URL;
    link.download = '기초레이아웃.xlsx';
    link.click();
  }, []);

  return (
    <Chip
      color="default"
      size={downsm ? 'small' : 'medium'}
      clickable
      onClick={handleDownloadLayout}
      icon={<ArrowCircleDownIcon />}
      label={
        <Typography fontSize={downsm ? '12px' : '16px'} variant="body1">
          기초 레이아웃 다운로드
        </Typography>
      }
    />
  );
});
LayoutDownloadButton.displayName = 'LayoutDownloadButton';
