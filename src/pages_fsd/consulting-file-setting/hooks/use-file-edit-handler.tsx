import { FocusEvent, KeyboardEvent, MouseEvent, useState } from 'react';

import { useConfirmToast, useTypographyToast } from '@/shared/hooks';

import { MAX_TITLE_LENGTH } from '../constants';
import { ConsultingFile } from '../models';
import { getFileNoFromEvent } from '../services';
import { useConsultingFileSettings } from './use-consulting-file-settings';
type UseFileEditHandlerProps = {
  file: ConsultingFile;
};

export const useFileEditHandler = ({ file }: UseFileEditHandlerProps) => {
  const { showError } = useTypographyToast();
  const { files, setFiles, editFileIndex, setEditFileIndex, updateRefTitle, deleteFile } = useConsultingFileSettings();
  const [origTitle, setOrigTitle] = useState<string>(file.RefTitle);
  const { openConfirmToast } = useConfirmToast();

  const resetFileList = (fileIndex: number, title: string) => {
    const newFileList = files.map((file) => {
      if (file.RefNo === fileIndex) {
        return { ...file, RefTitle: title };
      } else {
        return file;
      }
    });
    setFiles(newFileList);
  };

  const editRefTitle = (fileIndex: number) => {
    const currentStatus = editFileIndex[fileIndex - 1];
    const newEditFileIndex = currentStatus ? [...editFileIndex] : new Array(editFileIndex.length).fill(false);
    newEditFileIndex[fileIndex - 1] = !currentStatus;
    setEditFileIndex(newEditFileIndex);

    if (!currentStatus) return;
    const title = (document.getElementById(`textField-${fileIndex}`) as HTMLInputElement)?.value;
    const trimmedValue = title.trim();
    if (!trimmedValue || trimmedValue === origTitle || trimmedValue.length > MAX_TITLE_LENGTH) {
      if (trimmedValue !== origTitle) {
        showError(`자료명은 1 ~ ${MAX_TITLE_LENGTH}자 이내로 입력해주세요`);
      }
      setOrigTitle(origTitle);
      resetFileList(fileIndex, origTitle);
      return;
    }
    // title에 좌우공백만 추가된 경우 공백 없는 title로 변경
    if (title !== trimmedValue) {
      setOrigTitle(trimmedValue);
      resetFileList(fileIndex, trimmedValue);
      return;
    }
    updateRefTitle(fileIndex, trimmedValue, origTitle);
  };

  const handleTextInput = (event: MouseEvent<HTMLElement> | FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fileIndex = getFileNoFromEvent(event.currentTarget.id);
    editRefTitle(fileIndex);
  };

  const handleChange = (event: FocusEvent<HTMLInputElement>) => {
    const fileIndex = getFileNoFromEvent(event.currentTarget.id);
    const newTitle = event.target.value;
    resetFileList(fileIndex, newTitle);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      (event.target as HTMLInputElement).blur();
    }
  };
  //#endregion textfield

  const handleDeleteFile = (event: MouseEvent<HTMLElement>) => {
    const fileIndex = getFileNoFromEvent(event.currentTarget.id);
    //console.log('files', files, fileIndex);
    openConfirmToast({
      id: (fileIndex - 1).toString(),
      message: `"${files[fileIndex - 1].FileName}" 를 삭제하시겠습니까?`,
      callbackConfirm: () => deleteFile(files, fileIndex),
    });
  };
  return {
    resetFileList,
    editRefTitle,
    handleTextInput,
    handleChange,
    handleKeyDown,
    handleDeleteFile,
  };
};
