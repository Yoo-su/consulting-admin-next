'use client';

import { useState, memo, ReactNode, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { Stack, Typography, Badge, Box, Tooltip } from '@mui/material';
import { useShallow } from 'zustand/shallow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { BrowserItem } from '@/shared/models';
import { useOutsideClick, usePopover } from '@/shared/hooks';
import FilePopover from './file-popover';
import { useBrowserStore } from '@/shared/models/stores';

type BrowserFileProps = BrowserItem & {
  imageChildren: ReactNode;
  handleRenameFile: (event: KeyboardEvent<HTMLInputElement>, oldName: string, newName: string) => Promise<void>;
  handleDeleteFile: (filePath: string) => Promise<void>;
};
const BrowserFile = ({ name, path, imageChildren, handleRenameFile, handleDeleteFile }: BrowserFileProps) => {
  const filePopover = usePopover();
  const currentPath = useBrowserStore(useShallow((state) => state.currentPath));
  const [pureFileName = '', extension = ''] = name.split('.');
  const [newFileName, setNewFileName] = useState(pureFileName);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSetIsEditMode = useCallback(
    (modeState: boolean) => {
      setIsEditMode(modeState);
    },
    [isEditMode]
  );

  const handleChangeFileName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewFileName(currentPath + '/' + event.target.value + '.' + extension);
  }, []);

  const handleExitEditMode = useCallback(() => {
    setIsEditMode(false);
  }, []);
  const wrapperRef = useOutsideClick(handleExitEditMode);

  return (
    <Tooltip title={pureFileName} open={isHovered}>
      <Box
        ref={wrapperRef}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        sx={{
          borderRadius: '0.3rem',
          transition: 'all 0.1s ease-in-out',
          ':hover': {
            bgcolor: '#EBECEE',
          },
        }}
      >
        <Badge
          invisible={!isHovered}
          color={'info'}
          badgeContent={<MoreHorizIcon />}
          sx={{ cursor: 'pointer' }}
          ref={filePopover.anchorRef}
          onClick={filePopover.handleOpen}
        >
          <Stack
            direction={'column'}
            alignItems={'center'}
            gap={0.3}
            sx={{
              padding: '0.2rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {imageChildren}
            {isEditMode ? (
              <input
                type={'text'}
                style={{ width: '64px' }}
                defaultValue={pureFileName}
                onKeyDown={(event) => {
                  handleRenameFile(event, path, newFileName);
                }}
                onChange={handleChangeFileName}
              />
            ) : (
              <Typography
                variant={'caption'}
                width={'64px'}
                textAlign={'center'}
                whiteSpace={'nowrap'}
                overflow={'hidden'}
                textOverflow={'ellipsis'}
              >
                {pureFileName}
              </Typography>
            )}
          </Stack>
        </Badge>
        <FilePopover
          anchorEl={filePopover.anchorRef.current}
          open={filePopover.open}
          path={path}
          name={pureFileName}
          handleSetIsEditMode={handleSetIsEditMode}
          handleDeleteFile={handleDeleteFile}
          onClose={() => {
            filePopover.handleClose();
            setIsHovered(false);
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default memo(BrowserFile);
