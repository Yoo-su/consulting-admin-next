'use client';

import { useState, memo, ReactNode } from 'react';
import { Stack, Typography, Badge, Box, Tooltip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { BrowserItem } from '@/shared/models';
import { usePopover } from '@/shared/hooks';
import FilePopover from './file-popover';

type BrowserFileProps = BrowserItem & {
  imageChildren: ReactNode;
};
const BrowserFile = ({ name, path, size, lastModified, isDirectory, contentType, imageChildren }: BrowserFileProps) => {
  const filePopover = usePopover();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip title={name} open={isHovered}>
      <Box
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
          >
            {imageChildren}
            <Typography
              variant={'caption'}
              width={54}
              whiteSpace={'nowrap'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              {name}
            </Typography>
          </Stack>
        </Badge>
        <FilePopover
          anchorEl={filePopover.anchorRef.current}
          open={filePopover.open}
          path={path}
          name={name}
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
