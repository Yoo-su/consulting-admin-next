'use client';

import { debounce } from 'lodash';
import { ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useBrowserMutation } from '../../hooks';
import { useBrowserStore } from '../../models';

type FileNameInputProps = {
  originalFileName: string;
  extension: string;
  path: string;
};
export const FileNameInput = memo(({ originalFileName, extension, path }: FileNameInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentPath = useBrowserStore((state) => state.currentPath);
  const [newFileName, setNewFileName] = useState<string>(originalFileName);
  const { renameBrowserFile, isRenameBrowserFileLoading } = useBrowserMutation();

  const handleRenameBrowserFile = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, oldName: string, newName: string) => {
      if (event.key !== 'Enter') return;
      renameBrowserFile({ oldName, newName });
    },
    []
  );

  const handleChangeNewFileName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewFileName(currentPath + '/' + event.target.value + '.' + extension);
    },
    [currentPath, extension]
  );

  // Lodash debounce 적용
  const debouncedHandleChangeFileName = useMemo(
    () => debounce(handleChangeNewFileName, 500), // 300ms 지연
    [handleChangeNewFileName]
  );

  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.select();
  }, []);

  useEffect(() => {
    return () => {
      debouncedHandleChangeFileName.cancel();
    };
  }, [debouncedHandleChangeFileName]);

  return (
    <input
      ref={inputRef}
      type={'text'}
      disabled={isRenameBrowserFileLoading}
      style={{ width: '64px', border: 'none' }}
      defaultValue={originalFileName}
      onKeyDown={(event) => handleRenameBrowserFile(event, path, newFileName)}
      onChange={debouncedHandleChangeFileName}
    />
  );
});
FileNameInput.displayName = 'FileNameInput';
