import { ChangeEvent, useRef, useState, DragEvent, useCallback } from 'react';
import { useUploadMajorFileMutation } from './use-upload-major-file-mutation';
import { Univ, User } from '@/shared/models';

export const useHandleMajorFile = () => {
  const { mutateAsync, isPending: isUploadLoading, isSuccess: isUploadSuccess, reset } = useUploadMajorFileMutation();

  const [uploadDirectory, setUploadDirectory] = useState<string>(new Date().getFullYear().toString());
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [majorFiles, setMajorFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddMajorFile = useCallback(
    (files: File[]) => {
      const fileNames = majorFiles.map((file) => file.name);

      // 추가할 파일 중 이미 같은 이름이 있으면 return
      const newFiles = files.filter((file) => !fileNames.includes(file.name));
      if (newFiles.length === 0) return;

      setMajorFiles((prev) => [...prev, ...newFiles]);
    },
    [majorFiles]
  );

  const handleRemoveMajorFile = useCallback(
    (fileName: string) => {
      const updatedFiles = majorFiles.filter((file) => file.name !== fileName);
      setMajorFiles(updatedFiles);

      // DataTransfer 객체를 사용해 input의 파일 리스트에서 파일을 제거
      if (inputRef.current && inputRef.current.files) {
        const dataTransfer = new DataTransfer();

        // 남아있는 파일만 다시 추가
        Array.from(inputRef.current.files).forEach((file) => {
          if (file.name !== fileName) {
            dataTransfer.items.add(file);
          }
        });

        inputRef.current.files = dataTransfer.files; // 새로운 파일 리스트를 input에 설정
      }
    },
    [majorFiles]
  );

  const clearState = useCallback(() => {
    setMajorFiles([]);
    setFormData(new FormData());

    // input 엘리먼트의 파일 리스트를 초기화
    if (inputRef.current) {
      inputRef.current.value = ''; // input 값을 초기화
    }
  }, [majorFiles]);

  const handleClickInputBox = () => {
    if (isUploadLoading) return;
    inputRef?.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
    if (selectedFiles.length) handleAddMajorFile(selectedFiles);
  };

  const handleClickUploadBtn = async (user: User, univ: Univ) => {
    formData.set('UserID', user?.sub ?? '');
    formData.set('UnivID', univ?.univID ?? '');
    formData.set('Directory', uploadDirectory);
    await mutateAsync(formData);
  };

  const resetState = () => {
    clearState();
    reset();
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const arrayFiles = Array.from(event.dataTransfer.files);

    if (!arrayFiles.length) return;
    else handleAddMajorFile(arrayFiles);
  };

  return {
    majorFiles,
    uploadDirectory,
    formData,
    inputRef,
    isUploadSuccess,
    isUploadLoading,
    isDragging,
    clearState,
    resetState,
    handleAddMajorFile,
    handleRemoveMajorFile,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleClickInputBox,
    handleClickUploadBtn,
    handleFileChange,
  };
};
