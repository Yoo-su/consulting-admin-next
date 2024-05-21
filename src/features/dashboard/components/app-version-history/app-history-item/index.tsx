'use client';

import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { AppHistory } from '@/features/dashboard/types/app-history.type';
import apkIcon from '@/shared/assets/images/apk_64.png';
import { formatKoreanTextCompareDatesFromNow } from '@/shared/services/get-formatted-date';

type AppHistoryItemProps = {
  item: AppHistory;
};
const AppHistoryItem = ({ item }: AppHistoryItemProps) => {
  return (
    <Tooltip
      title={
        <Stack direction={'column'}>
          <Typography variant="caption">{item.packageFileName ?? 'unknown apk'}</Typography>
          <Typography variant="caption">Note: {item.releaseNote ?? '-'}</Typography>
        </Stack>
      }
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        sx={{
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          p: 1,
          '&:hover': {
            transform: 'scale(1.05)',
            bgcolor: 'rgba(0,0,0,0.1)',
          },
          transition: 'all 0.1s linear',
        }}
      >
        <Image src={apkIcon} width={'32'} height={'32'} alt={item.packageFileName ?? 'apk'} />
        <Stack direction={'column'} sx={{ overflow: 'hidden', justifyContent: 'space-between', flexGrow: 1 }}>
          <Typography variant="caption" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {item.packageFileName ?? 'unknown apk'}
          </Typography>
          <Typography variant="caption" color="grey.500" textAlign="right">
            {formatKoreanTextCompareDatesFromNow(item.uploadTime)}
          </Typography>
        </Stack>
      </Stack>
    </Tooltip>
  );
};

export default AppHistoryItem;
