'use client';

import { MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { memo, useCallback } from 'react';

import { useHandleBrowserItem } from '../../hooks';

export type FilePopoverProps = {
  anchorEl: Element | null;
  open: boolean;
  path: string;
  name: string;
  onClose: () => void;
  handleSetIsEditMode: (modeState: boolean) => void;
};
export const FilePopover = memo(({ anchorEl, open, path, name, onClose, handleSetIsEditMode }: FilePopoverProps) => {
  const { handleDeleteBrowserFile, handleDownloadFile } = useHandleBrowserItem();

  const handleClick = useCallback(
    (action: () => void) => {
      action();
      onClose();
    },
    [onClose]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      aria-hidden={!open}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: 'fit-content' } } }}
    >
      <MenuList>
        <MenuItem onClick={() => handleClick(() => handleDownloadFile(path, name))}>
          <Typography variant="caption">다운로드</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClick(() => handleSetIsEditMode(true))}>
          <Typography variant="caption">파일명수정</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClick(() => handleDeleteBrowserFile(path))}>
          <Typography variant="caption">자료삭제</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
});
FilePopover.displayName = 'FilePopover';
