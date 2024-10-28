import { MenuItem, MenuList, Popover, Typography } from '@mui/material';

import { useDownloadFile } from '@/shared/hooks';
import { API_URLS } from '@/shared/constants';

export type FilePopoverProps = {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
  path: string;
  name: string;
};
const FilePopover = ({ anchorEl, onClose, open, path, name }: FilePopoverProps) => {
  const { downloadFile } = useDownloadFile();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: 'fit-content' } } }}
    >
      <MenuList>
        <MenuItem
          onClick={async () => {
            const encoded = encodeURIComponent(decodeURIComponent(path));
            const url = `${process.env.NEXT_PUBLIC_BASE_URL + API_URLS.dashboard.downloadBrowsedFile}/${encoded}`;
            await downloadFile(url, name);
            onClose();
          }}
        >
          <Typography variant="caption">다운로드</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="caption">자료삭제</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default FilePopover;
