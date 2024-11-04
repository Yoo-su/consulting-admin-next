import { memo } from 'react';
import { MenuItem, MenuList, Popover, Typography } from '@mui/material';

import { useDownloadFile } from '@/shared/hooks';
import { API_URLS } from '@/shared/constants';
import { useDeleteBrowserFileMutation } from '@/shared/hooks/tanstack/use-delete-browser-item-mutation';
import { useQueryClient } from '@tanstack/react-query';

export type FilePopoverProps = {
  anchorEl: Element | null;
  onClose: () => void;
  handleSetIsEditMode: (modeState: boolean) => void;
  open: boolean;
  path: string;
  name: string;
};
const FilePopover = ({ anchorEl, open, path, name, onClose, handleSetIsEditMode }: FilePopoverProps) => {
  const queryClient = useQueryClient();
  const { downloadFile } = useDownloadFile();
  const { mutateAsync } = useDeleteBrowserFileMutation(path);

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

  const hadleDeleteFile = () => {
    const tmp = path.replace(name, '');
    const key = tmp.substring(0, tmp.length - 1);

    mutateAsync().then(() => {
      queryClient.invalidateQueries({
        queryKey: ['get-browser-list', key],
      });
    });
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
        <MenuItem onClick={hadleDeleteFile}>
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
