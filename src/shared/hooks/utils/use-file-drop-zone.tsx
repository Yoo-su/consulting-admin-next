import { DragEvent, useCallback, useState } from 'react';

type UseDragAndDropProps = {
  onDragEnter?: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: DragEvent<HTMLDivElement>) => void;
};

export const useFileDropZone = ({
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}: UseDragAndDropProps = {}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragEnter = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
      onDragEnter?.(event);
    },
    [onDragEnter]
  );

  const handleDragLeave = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      onDragLeave?.(event);
    },
    [onDragLeave]
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
      onDragOver?.(event);
    },
    [onDragOver]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      onDrop?.(event);
    },
    [onDrop]
  );

  return {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};
