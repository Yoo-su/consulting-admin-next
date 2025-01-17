import { DragEvent, RefObject, SetStateAction } from 'react';

import {
  checkFileType,
  fileTypeErrorToast,
  fileUploadErrorToast,
} from '../services';

type UseFileDropHandlerProps = {
  addToFiles: (uploadedFile: File | undefined) => void;
  setFileEnter: (value: SetStateAction<boolean>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
};

type FileDropHandlerProps = {
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: DragEvent<HTMLDivElement>) => void;
};

export const useFileDropHandler = ({
  addToFiles,
  setFileEnter,
  fileInputRef,
}: UseFileDropHandlerProps): FileDropHandlerProps => {
  const processFileSystemEntries = async (items: DataTransferItemList) => {
    const processEntry = async (entry: FileSystemEntry): Promise<void> => {
      if (!entry) return;
      if (entry.isFile) {
        return new Promise<void>((resolve) => {
          (entry as FileSystemFileEntry).file((file) => {
            if (checkFileType(file)) {
              addToFiles(file);
            } else {
              fileTypeErrorToast(file.name);
            }
            resolve();
          });
        });
      }

      if (entry.isDirectory) {
        const reader = (entry as FileSystemDirectoryEntry).createReader();
        const entries = await new Promise<FileSystemEntry[]>((resolve) => {
          reader.readEntries(resolve);
        });

        await Promise.all(entries.map(processEntry));
      }
    };

    try {
      const entries = Array.from(items)
        .map((item) => item.webkitGetAsEntry())
        .filter((entry): entry is FileSystemEntry => entry !== null);

      await Promise.all(entries.map(processEntry));
    } catch (error) {
      console.error('Error processing files:', error);
      fileUploadErrorToast();
    }
  };

  const handleDropEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFileEnter(false);
    const items = event.dataTransfer.items;

    if (items) {
      processFileSystemEntries(items);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFileEnter(event.type == 'dragover');
  };

  return {
    onDrop: handleDropEvent,
    onDragOver: handleDragEvent,
    onDragLeave: handleDragEvent,
    onDragEnd: handleDragEvent,
  };
};
