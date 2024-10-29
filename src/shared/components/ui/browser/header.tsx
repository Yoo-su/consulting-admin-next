import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type BrowserHeaderProps = {
  displayingPath: string;
  fileCount: number;
  showCurrentPath?: boolean;
  isNotRoot?: boolean;
  onClickPrev: () => void;
};

const BrowserHeader = ({
  displayingPath,
  fileCount,
  showCurrentPath = true,
  isNotRoot = false,
  onClickPrev,
}: BrowserHeaderProps) => (
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

    {isNotRoot && (
      <Stack direction="row" sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        <Tooltip title="이전으로" followCursor>
          <IconButton size="small" onClick={onClickPrev}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    )}
  </Stack>
);

export default BrowserHeader;
