import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useShallow } from 'zustand/shallow';

import { useUser } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { useFoundationStore } from '../models';

export const useHandleFoundationData = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const { currentService, currentUniv } = useSharedStore(
    useShallow((state) => ({
      currentService: state.currentService,
      currentUniv: state.currentUniv,
    }))
  );
  const { file, formData, setFile } = useFoundationStore(
    useShallow((state) => ({
      file: state.file,
      formData: state.formData,
      setFile: state.setFile,
    }))
  );

  const containerTitle = `${currentUniv?.univName}(${currentService?.serviceID}) 기초데이터 업로드`;
  const inputElKey = useMemo(() => {
    return file?.name ?? '' + file?.lastModified ?? '';
  }, [file]);

  const uploadInputTitle = useMemo(() => {
    return file?.name ?? '기초데이터 엑셀을 올려주세요';
  }, [file]);

  // file 변경 처리
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const targetFile = event.target.files?.[0] ?? null;
      setFile(targetFile);
      targetFile ? formData.set('file', targetFile) : formData.delete('file');
    },
    []
  );

  const handleClickInput = useCallback(() => {
    inputRef?.current?.click();
  }, [inputRef]);

  const handleDropExcel = useCallback((event: DragEvent<HTMLDivElement>) => {
    setFile(event.dataTransfer.files[0] ?? null);
  }, []);

  useEffect(() => {
    if (user) formData.set('userID', user?.sub);
  }, [user]);

  useEffect(() => {
    setFile(null);
    formData.set('serviceID', currentService?.serviceID ?? '');
  }, [currentService]);

  return {
    inputRef,
    inputElKey,
    containerTitle,
    uploadInputTitle,
    handleInputChange,
    handleClickInput,
    handleDropExcel,
  };
};
