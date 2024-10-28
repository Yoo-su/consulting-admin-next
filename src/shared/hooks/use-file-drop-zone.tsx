import { useCallback, useState, DragEvent, useRef } from 'react';

type UseDragAndDropProps = {
  onDrop: () => void;
};

export const useFileDropZone = ({ onDrop }: UseDragAndDropProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [queueFiles, setQueueFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());
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

      const arrayFiles = Array.from(event.dataTransfer.files);
      if (!arrayFiles.length) return;
      else handleAddFiles(arrayFiles);
      onDrop();
    },
    [onDrop]
  );

  return {
    isDragging,
    queueFiles,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleAddFiles,
    handleRemoveFile,
  };
};
