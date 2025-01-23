import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useTypographyToast } from '@/shared/hooks';
import { getConvertedValue } from '@/shared/services/get-converted-value';

import { MAP_ERROR_MESSAGE } from '../constants';
import { FlutterRowInfo, MapObject, Path } from '../models';
import { getArrayToObjectForm, getInitialValue } from '../services';
import { useFlutterSetting } from '.';

type UseMapFormProps = {
  item?: FlutterRowInfo | undefined;
  path: Path;
  handleEdit: (path: Path, value: string) => void;
  isDisabled: boolean;
};

export type UseMapFormReturn = {
  handleCancel: () => void;
  handleEditInput: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (event: MouseEvent<HTMLButtonElement>) => void;
  handleConfirm: (event: MouseEvent<HTMLButtonElement>) => void;
  rows: MapObject[];
  objValue: MapObject;
  setObjValue: Dispatch<SetStateAction<MapObject>>;
  isAdd: boolean;
  setIsAdd: Dispatch<SetStateAction<boolean>>;
  isEditObj: boolean[];
  isDisabled: boolean;
};

export const useMapForm = ({
  item,
  path,
  handleEdit: onEdit,
  isDisabled,
}: UseMapFormProps): UseMapFormReturn => {
  const { showError } = useTypographyToast();
  const { addToEditedList } = useFlutterSetting();
  const {
    transferDefaultValue = null,
    OriginalRowValue = null,
    RowIdx = null,
    RowValue = null,
  } = item ?? {};

  const initObj = { item: '', value: '' };
  const dataObj = getConvertedValue(
    (RowValue ?? transferDefaultValue ?? '{}') as string
  );
  const setRowsValue = useMemo(
    () =>
      Object.keys(dataObj).map((data) => ({
        item: data,
        value: dataObj[data],
      })),
    [dataObj]
  );

  const [isAdd, setIsAdd] = useState(item ? false : true);
  const [isEditObj, setIsEditObj] = useState<boolean[]>(
    Array(Object.keys(dataObj).length).fill(false)
  );
  const [objValue, setObjValue] = useState<MapObject>(initObj);
  const [rows, setRows] = useState<MapObject[]>(setRowsValue);

  const initialValue = getInitialValue(transferDefaultValue, OriginalRowValue);

  //#region utilities
  /** 입력값 초기화  */
  const resetValues = useCallback(() => {
    setObjValue(initObj);
    setIsAdd(false);
  }, [setObjValue, setIsAdd]);
  /** 수정모드 설정  */
  const setEditValue = useCallback(
    (index: number, value: boolean) => {
      setIsEditObj((prev) => {
        const newEdit = [...prev];
        newEdit[index] = value;
        return newEdit;
      });
    },
    [setIsEditObj]
  );
  /** 중복키 검사  */
  const isDuplicateKey = useCallback(
    (key: string, index: number) => {
      let i = -1;
      for (const row of rows) {
        ++i;
        if (!isNaN(index) && i === index) continue;
        if (row.item === key) {
          showError(MAP_ERROR_MESSAGE.DUPLICATE_KEY);
          return true;
        }
      }
      return false;
    },
    [rows]
  );
  /** 입력값 validation  */
  const validateInput = useCallback(
    (index: number) => {
      // 수정한 값이 원래 값과 같은 경우
      if (
        !isNaN(index) &&
        rows[index].item === objValue.item &&
        rows[index].value === objValue.value
      ) {
        setEditValue(index, false);
        resetValues();
        return false;
      }
      // 빈 값이 있는 경우
      if (!objValue.item || !objValue.value) {
        showError(MAP_ERROR_MESSAGE.EMPTY_VALUE);
        return false;
      }
      // 중복된 key가 있는 경우
      return isDuplicateKey(objValue.item, index) === false;
    },
    [rows, objValue, isDuplicateKey, setEditValue, resetValues]
  );
  /** 수정한 값 저장  */
  const saveEditedValue = useCallback(
    (newRows: MapObject[]) => {
      try {
        if (RowIdx === null) return;
        const rowObject = getArrayToObjectForm(newRows);
        onEdit(path, rowObject);
        addToEditedList({
          RowIdx,
          RowValue: rowObject,
          InitialValue: initialValue,
        });
        setRows(newRows);
      } catch (error) {
        showError(MAP_ERROR_MESSAGE.SAVE_FAILED);
      }
    },
    [RowIdx, initialValue, onEdit, addToEditedList, path, initialValue, setRows]
  );
  const getIndexFromId = useCallback(
    (id: string): number => parseInt(id.split('-')[1]),
    []
  );
  //#endregion utilities
  //#region handle functions
  const handleCancel = useCallback(() => {
    resetValues();
  }, [resetValues]);

  const handleConfirm = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const index = getIndexFromId(event.currentTarget.id);

      if (validateInput(index) == false) return;
      const newRows = [...rows];
      const rowIndex = isNaN(index) ? rows.length : index;
      setEditValue(rowIndex, false);
      newRows[rowIndex] = { item: objValue.item, value: objValue.value };

      // 수정 리스트에 추가
      saveEditedValue(newRows);
      resetValues();
    },
    [validateInput, rows, objValue, setEditValue, saveEditedValue, resetValues]
  );

  const handleEditInput = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const index = getIndexFromId(event.currentTarget.id);
      setEditValue(index, true);
      setIsAdd(false);
      setObjValue({ item: rows[index].item, value: rows[index].value });
    },
    [setEditValue, rows, setIsAdd, setObjValue]
  );

  const handleDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const index = getIndexFromId(event.currentTarget.id);
      const newList = rows.filter((_, i) => i !== index);
      // list가 비어있는 경우 추가 모드 활성화
      setIsAdd(newList.length < 1);
      // 수정 리스트에 추가
      saveEditedValue(newList);
    },
    [rows, saveEditedValue, setIsAdd]
  );
  //#endregion handle functions

  useEffect(() => {
    setRows(setRowsValue);
  }, [RowValue]);

  return {
    handleCancel,
    handleEditInput,
    handleDelete,
    handleConfirm,
    rows,
    objValue,
    setObjValue,
    isAdd,
    setIsAdd,
    isEditObj,
    isDisabled,
  };
};
