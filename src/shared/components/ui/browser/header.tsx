import { ChangeEvent, memo, useRef } from 'react';
import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadFileIcon from '@mui/icons-material/UploadFile';

type BrowserHeaderProps = {
  displayingPath: string;
  fileCount: number;
  showCurrentPath?: boolean;
  isNotRoot?: boolean;
  isDropZone?: boolean;
  handleAddFiles: (files: File[]) => void;
  onClickPrev: () => void;
};

const BrowserHeader = ({
  displayingPath,
  fileCount,
  showCurrentPath = true,
  isDropZone = false,
  isNotRoot = false,
  handleAddFiles,
  onClickPrev,
}: BrowserHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickFileIcon = () => {
    fileInputRef?.current?.click();
  };

  const handleChangeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    handleAddFiles(event.target.files ? Array.from(event.target.files) : []);
    event.target.value = '';
  };

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
        <Typography variant="body2" color="grey.700">{`${fileCount}건`}</Typography>
      </Stack>

      <Stack direction="row" gap={1.5} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        {isDropZone && (
          <Tooltip title={'파일추가'}>
            <IconButton size="small" onClick={handleClickFileIcon}>
              <UploadFileIcon />
            </IconButton>
          </Tooltip>
        )}
        {isNotRoot && (
          <Tooltip title={'이전으로'} followCursor>
            <IconButton size="small" onClick={onClickPrev}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <input style={{ display: 'none' }} type={'file'} multiple ref={fileInputRef} onChange={handleChangeFileInput} />
    </Stack>
  );
};

export default memo(BrowserHeader);
