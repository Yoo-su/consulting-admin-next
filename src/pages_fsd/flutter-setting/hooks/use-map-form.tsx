import { Typography } from '@mui/material';

import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { getConvertedValue } from '@/shared/services/get-converted-value';

import { useFlutterSetting } from '.';
import { FlutterRowInfo, MapObject, Path } from '../models';
import { getArrayToObjectForm, getInitialValue } from '../services';

type UseMapFormProps = {
  item?: FlutterRowInfo | undefined;
  path: Path;
  handleEdit: (path: Path, value: string) => void;
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
};

export const useMapForm = ({
  item,
  path,
  handleEdit: onEdit,
}: UseMapFormProps): UseMapFormReturn => {
  const { transferDefaultValue, RowIdx = null, RowValue = null } = item ?? {};
  const dataObj = getConvertedValue(RowValue ?? transferDefaultValue ?? '{}');
  const { addToEditedList } = useFlutterSetting();
  // TODO: 취소 했음에도 변경으로 처리되는 거 수정
  const [isAdd, setIsAdd] = useState(item ? false : true);
  const [isEditObj, setIsEditObj] = useState<boolean[]>(
    Array(Object.keys(dataObj).length).fill(false)
  );
  const [objValue, setObjValue] = useState<MapObject>({ item: '', value: '' });
  const [rows, setRows] = useState<MapObject[]>(
    Object.keys(dataObj).map((data) => ({ item: data, value: dataObj[data] }))
  );

  const initialValue = getInitialValue(item);

  //#region utilities
  /** 입력값 초기화  */
  const resetValues = () => {
    setObjValue({ item: '', value: '' });
    setIsAdd(false);
  };
  /** 수정모드 설정  */
  const setEditValue = (index: number, value: boolean) => {
    setIsEditObj((prev) => {
      const newEdit = [...prev];
      newEdit[index] = value;
      return newEdit;
    });
  };
  /** 중복키 검사  */
  const isDuplicateKey = (key: string, index: number) => {
    let i = -1;
    for (const row of rows) {
      ++i;
      if (!isNaN(index) && i === index) continue;
      if (row.item === key) {
        toast.error(
          <Typography variant="body2">item명 중복 불가합니다</Typography>
        );
        return true;
      }
    }
    return false;
  };
  /** 입력값 validation  */
  const validateInput = (index: number) => {
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
      toast.error(<Typography variant="body2">빈 값이 있습니다</Typography>);
      return false;
    }
    // 중복된 key가 있는 경우
    if (isDuplicateKey(objValue.item, index)) return false;
    return true;
  };
  /** 수정한 값 저장  */
  const saveEditedValue = (newRows: MapObject[]) => {
    if (RowIdx === null) return;
    const rowObject = getArrayToObjectForm(newRows);
    onEdit(path, rowObject);
    addToEditedList({
      RowIdx,
      RowValue: rowObject,
      InitialValue: initialValue,
    });
    setRows(newRows);
  };
  //#endregion utilities
  //#region handle functions
  const handleCancel = () => {
    resetValues();
  };

  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const index = parseInt(event.currentTarget.id.split('-')[1]);

    if (validateInput(index) == false) return;
    const newRows = [...rows];
    const rowIndex = isNaN(index) ? rows.length : index;
    setEditValue(rowIndex, false);
    newRows[rowIndex] = { item: objValue.item, value: objValue.value };

    // 수정 리스트에 추가
    saveEditedValue(newRows);
    resetValues();
  };

  const handleEditInput = (event: MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.id.split('-')[1]);
    setEditValue(index, true);
    setIsAdd(false);
    setObjValue({ item: rows[index].item, value: rows[index].value });
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.id.split('-')[1]);
    const newList = rows.filter((_, i) => i !== index);
    // list가 비어있는 경우 추가 모드 활성화
    setIsAdd(newList.length < 1);
    // 수정 리스트에 추가
    saveEditedValue(newList);
  };
  //#endregion handle functions

  useEffect(() => {
    setRows(
      Object.keys(dataObj).map((data) => ({ item: data, value: dataObj[data] }))
    );
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
  };
};
