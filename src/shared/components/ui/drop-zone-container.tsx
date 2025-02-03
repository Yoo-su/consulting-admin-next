import { Box, SxProps } from '@mui/material';
import { DragEvent, HTMLAttributes, ReactNode } from 'react';

import { useFileDropZone } from '@/shared/hooks';

type DropZoneContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  sx?: SxProps;
  onDragEnter?: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: DragEvent<HTMLDivElement>) => void;
};
export const DropZoneContainer = ({
  children,
  sx,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  ...rest
}: DropZoneContainerProps) => {
  const { handleDragEnter, handleDragOver, handleDragLeave, handleDrop } = useFileDropZone({
    onDragEnter: onDragEnter,
    onDragOver: onDragOver,
    onDragLeave: onDragLeave,
    onDrop: onDrop,
  });

  return (
    <Box
      sx={{ ...sx }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      {...rest}
    >
      {children}
    </Box>
  );
};
