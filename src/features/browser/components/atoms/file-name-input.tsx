'use client';

import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type FileNameInputProps = {
  defaultValue: string;
  currentPath: string;
  extension: string;
  path: string;
  handleRenameFile: (
    event: KeyboardEvent<HTMLInputElement>,
    oldName: string,
    newName: string
  ) => Promise<void>;
};
export const FileNameInput = memo(
  ({
    defaultValue,
    currentPath,
    extension,
    path,
    handleRenameFile,
  }: FileNameInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [newFileName, setNewFileName] = useState<string>(defaultValue);

    const handleChangeFileName = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setNewFileName(
          currentPath + '/' + event.target.value + '.' + extension
        );
      },
      [currentPath, extension]
    );

    useEffect(() => {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    }, []);

    return (
      <input
        ref={inputRef}
        type={'text'}
        style={{ width: '64px', border: 'none' }}
        defaultValue={defaultValue}
        onKeyDown={(event) => {
          handleRenameFile(event, path, newFileName);
        }}
        onChange={handleChangeFileName}
      />
    );
  }
);
FileNameInput.displayName = 'FileNameInput';
