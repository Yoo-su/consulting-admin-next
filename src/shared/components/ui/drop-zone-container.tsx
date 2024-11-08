import { DragEvent, ReactNode } from 'react';
import { SxProps, Box } from '@mui/material';
import { useFileDropZone } from '@/shared/hooks';

type DropZoneContainerProps = {
  children: ReactNode;
  sx?: SxProps;
  onDragEnter?: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: DragEvent<HTMLDivElement>) => void;
};
const DropZoneContainer = ({ children, sx, onDragEnter, onDragOver, onDragLeave, onDrop }: DropZoneContainerProps) => {
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
    >
      {children}
    </Box>
  );
};

export default DropZoneContainer;
