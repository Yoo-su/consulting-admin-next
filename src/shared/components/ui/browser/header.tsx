import { memo, useCallback, useMemo } from 'react';
import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useGetBrowserListQuery } from '@/shared/hooks/tanstack';
import { useBrowserStore, useQueueStore } from '@/shared/models/stores';

type BrowserHeaderProps = {
  showCurrentPath?: boolean;
  isDropZone?: boolean;
  handleClickInput: () => void;
};
const BrowserHeader = ({ showCurrentPath = true, isDropZone = false, handleClickInput }: BrowserHeaderProps) => {
  const { currentPath, basePath, setCurrentPath } = useBrowserStore();
  const queueFiles = useQueueStore((state) => state.queueFiles);
  const { data } = useGetBrowserListQuery(currentPath);

  // 화면에 보여줄 path
  const displayingPath = useMemo(() => {
    const parts = currentPath.split('/');
    return parts.slice(1).join('/') ?? '/';
  }, [currentPath]);

  // 현재 위치가 base path인지 여부
  const isNotRoot = useMemo(() => {
    const slashCnt = currentPath.split('/').length - 1;
    if (slashCnt > 0 && currentPath !== basePath) return true;
    else return false;
  }, [currentPath, basePath]);

  // 이전 버튼 클릭 처리
  const handleClickPrevBtn = useCallback(() => {
    if (queueFiles.length) return;
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    setCurrentPath(newPath);
  }, [currentPath, queueFiles]);

  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" height="35px">
      <Stack direction="row" alignItems="center" gap={2} ml={1}>
        {showCurrentPath && (
          <Stack
            direction="row"
            sx={{
              bgcolor: '#fff',
              width: 'fit-content',
              borderRadius: '0.3rem',
              padding: '0.3rem',
              transition: 'width 0.2s linear',
              border: '1px solid #B6BBBF',
              alignItems: 'center',
            }}
          >
            <Typography variant="caption" color="grey.700">
              현재경로: <b>{displayingPath}</b>
            </Typography>
          </Stack>
        )}
        <Typography variant="body2" color="grey.700">{`${data?.length ?? 0}건`}</Typography>
      </Stack>

      <Stack direction="row" gap={1.5} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        {isDropZone && (
          <Tooltip title={'파일추가'}>
            <IconButton size="small" onClick={handleClickInput}>
              <UploadFileIcon />
            </IconButton>
          </Tooltip>
        )}
        {isNotRoot && (
          <Tooltip title={'이전으로'} followCursor>
            <IconButton size="small" onClick={handleClickPrevBtn}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
};

export default memo(BrowserHeader);
