import { ChangeEvent, memo, RefObject } from 'react';

type FileInputProps = {
  inputKey: string;
  inputRef: RefObject<HTMLInputElement>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export const FileInput = memo(({ inputKey, inputRef, handleChange }: FileInputProps) => {
  return (
    <input
      type="file"
      key={inputKey}
      ref={inputRef}
      style={{ display: 'none' }}
      onChange={handleChange}
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
  );
});
FileInput.displayName = 'FileInput';
