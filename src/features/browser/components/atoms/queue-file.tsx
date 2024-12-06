'use client';

import { Badge, Box, Stack, Tooltip, Typography } from '@mui/material';
import { memo, ReactNode, useState } from 'react';

type QueueFileProps = {
  fileName: string;
  handleRemoveFile: (fileName: string) => void;
  imageChildren: ReactNode;
};
export const QueueFile = memo(
  ({ fileName, imageChildren, handleRemoveFile }: QueueFileProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Tooltip
        title={`${fileName} _ 클릭 시 대기열에서 제거됩니다`}
        open={isHovered}
        followCursor
      >
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
            padding: '0.08rem',
            ':hover': {
              bgcolor: 'rgba(188,84,72)',
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
  }
);
QueueFile.displayName = 'QueueFile';
