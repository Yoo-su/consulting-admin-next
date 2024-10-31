'use client';

import { useState, memo, ReactNode } from 'react';
import { Stack, Typography, Badge, Box, Tooltip } from '@mui/material';

type BrowserQueueFileProps = {
  fileName: string;
  handleRemoveFile: (fileName: string) => void;
  imageChildren: ReactNode;
};
const BrowserQueueFile = ({ fileName, imageChildren, handleRemoveFile }: BrowserQueueFileProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip title={`${fileName} _ 클릭 시 대기열에서 제거됩니다`} open={isHovered}>
      <Box
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        sx={{
          borderRadius: '0.3rem',
          animation: 'wiggle 2s infinite',
          opacity: 0.75,
          transition: 'all 0.1s ease-in-out',
          ':hover': {
            bgcolor: '#EBECEE',
            border: '0.1px solid #BC5448',
          },
        }}
      >
        <Badge
          invisible={!isHovered}
          color={'error'}
          badgeContent={'X'}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleRemoveFile(fileName);
          }}
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
              width={'64px'}
              textAlign={'center'}
              whiteSpace={'nowrap'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              {fileName}
            </Typography>
          </Stack>
        </Badge>
      </Box>
    </Tooltip>
  );
};

export default memo(BrowserQueueFile);
