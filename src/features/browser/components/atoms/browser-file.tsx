'use client';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Badge, Box, Stack, Tooltip, Typography } from '@mui/material';
import { KeyboardEvent, memo, ReactNode, useCallback, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { useOutsideClick, usePopover } from '@/shared/hooks';

import { BrowserItem, useBrowserStore } from '../../models';
import { FileNameInput } from './file-name-input';
import { FilePopover } from './file-popover';

type BrowserFileProps = BrowserItem & {
  imageChildren: ReactNode;
  handleRenameFile: (
    event: KeyboardEvent<HTMLInputElement>,
    oldName: string,
    newName: string
  ) => Promise<void>;
  handleDeleteFile: (filePath: string) => Promise<void>;
};
export const BrowserFile = memo(
  ({
    name,
    path,
    imageChildren,
    handleRenameFile,
    handleDeleteFile,
  }: BrowserFileProps) => {
    const filePopover = usePopover();
    const currentPath = useBrowserStore(
      useShallow((state) => state.currentPath)
    );
    const [pureFileName = '', extension = ''] = name.split(/\.(?=[^.]*$)/);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleSetIsEditMode = useCallback(
      (modeState: boolean) => {
        setIsEditMode(modeState);
      },
      [isEditMode]
    );

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
                <FileNameInput
                  currentPath={currentPath}
                  path={path}
                  extension={extension}
                  defaultValue={pureFileName}
                  handleRenameFile={handleRenameFile}
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
            name={name}
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
  }
);
BrowserFile.displayName = 'BrowserFile';
