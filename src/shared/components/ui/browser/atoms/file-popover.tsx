import { memo } from 'react';
import { MenuItem, MenuList, Popover, Typography } from '@mui/material';

import { useDownloadFile } from '@/shared/hooks';
import { API_URLS } from '@/shared/constants';

export type FilePopoverProps = {
  anchorEl: Element | null;
  open: boolean;
  path: string;
  name: string;
  onClose: () => void;
  handleSetIsEditMode: (modeState: boolean) => void;
  handleDeleteFile: (filePath: string) => Promise<void>;
};
const FilePopover = ({
  anchorEl,
  open,
  path,
  name,
  onClose,
  handleSetIsEditMode,
  handleDeleteFile,
}: FilePopoverProps) => {
  const { downloadFile } = useDownloadFile();

  const handleDownloadFile = async () => {
    const encoded = encodeURIComponent(decodeURIComponent(path));
    const url = `${process.env.NEXT_PUBLIC_BASE_URL + API_URLS.dashboard.downloadBrowserFile}/${encoded}`;
    await downloadFile(url, name);
    onClose();
  };

  const handleEnterEditMode = () => {
    handleSetIsEditMode(true);
    onClose();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: 'fit-content' } } }}
    >
      <MenuList>
        <MenuItem onClick={handleDownloadFile}>
          <Typography variant="caption">다운로드</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteFile(path);
          }}
        >
          <Typography variant="caption">자료삭제</Typography>
        </MenuItem>
        <MenuItem onClick={handleEnterEditMode}>
          <Typography variant="caption">파일명수정</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default memo(FilePopover);
