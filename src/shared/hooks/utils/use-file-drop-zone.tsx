import { useCallback, useState, DragEvent, useRef } from 'react';

type UseDragAndDropProps = {
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
};

export const useFileDropZone = ({ onDrop }: UseDragAndDropProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [queueFiles, setQueueFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddFiles = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      setQueueFiles((prev) => [...prev, ...files]);
    },
    [queueFiles]
  );

  const handleRemoveFile = useCallback(
    (fileName: string) => {
      const filtered = queueFiles.filter((file) => file.name !== fileName);
      setQueueFiles(filtered);

      // DataTransfer 객체를 사용해 input의 파일 리스트에서 파일을 제거
      if (inputRef.current && inputRef.current.files) {
        const dataTransfer = new DataTransfer();

        // 남아있는 파일만 다시 추가
        Array.from(inputRef.current.files).forEach((file) => {
          if (file.name !== fileName) dataTransfer.items.add(file);
        });
        inputRef.current.files = dataTransfer.files; // 새로운 파일 리스트를 input에 설정
      }
    },
    [queueFiles]
  );

  const handleResetFiles = useCallback(() => {
    setQueueFiles([]);
  }, []);

  const handleDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      onDrop(event);
    },
    [onDrop]
  );

  return {
    isDragging,
    queueFiles,
    handleResetFiles,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleAddFiles,
    handleRemoveFile,
  };
};
