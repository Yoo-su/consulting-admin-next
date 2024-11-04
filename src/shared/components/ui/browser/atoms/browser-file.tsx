'use client';

import { useState, memo, ReactNode, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { UseMutateAsyncFunction, useQueryClient } from '@tanstack/react-query';
import { Stack, Typography, Badge, Box, Tooltip } from '@mui/material';
import toast from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { BrowserItem } from '@/shared/models';
import { useOutsideClick, usePopover } from '@/shared/hooks';
import FilePopover from './file-popover';
import { RenameBrowserFileProps } from '@/shared/apis/rename-browser-file';

type BrowserFileProps = BrowserItem & {
  imageChildren: ReactNode;
  handleRenameFile: (event: KeyboardEvent<HTMLInputElement>, oldName: string, newName: string) => Promise<void>;
};
const BrowserFile = ({
  name,
  path,
  size,
  lastModified,
  isDirectory,
  contentType,
  imageChildren,
  handleRenameFile,
}: BrowserFileProps) => {
  const queryClient = useQueryClient();
  const filePopover = usePopover();
  const [newFileName, setNewFileName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSetIsEditMode = useCallback(
    (modeState: boolean) => {
      setIsEditMode(modeState);
    },
    [isEditMode]
  );

  const getParentPath = useCallback(() => {
    const tmp = path.replace(name, '');
    const result = tmp.substring(0, tmp.length - 1);
    return result;
  }, []);

  const handleChangeFileName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewFileName(getParentPath() + '/' + event.target.value);
  }, []);

  const handleExitEditMode = useCallback(() => {
    setIsEditMode(false);
  }, []);
  const wrapperRef = useOutsideClick(handleExitEditMode);

  return (
    <Tooltip title={name} open={isHovered}>
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
                {name}
              </Typography>
            )}
          </Stack>
        </Badge>
        <FilePopover
          anchorEl={filePopover.anchorRef.current}
          open={filePopover.open}
          path={path}
          name={name}
          handleSetIsEditMode={handleSetIsEditMode}
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
