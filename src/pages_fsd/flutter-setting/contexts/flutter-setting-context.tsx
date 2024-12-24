'use client';

import Typography from '@mui/material/Typography';
import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { QUERY_KEYS } from '@/shared/constants';
import { useSharedStore } from '@/shared/models';

import { SetFlutterCustomConfigParams } from '../apis';
import { useSetFlutterSettingMutation } from '../hooks';
import { FlutterSetting } from '../models';
import { getArrayFromString } from '../services';

export type FlutterSettingContextValue = {
  flutterSettingList: FlutterSetting[];
  setFlutterSettingList: Dispatch<SetStateAction<FlutterSetting[]>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  filteredSettingList: FlutterSetting[];
  setFilteredSettingList: Dispatch<SetStateAction<FlutterSetting[]>>;
  editedSettingList: SetFlutterCustomConfigParams[];
  resetEditedSettingList: () => void;
  addToEditedList: (
    editedSetting: Pick<SetFlutterCustomConfigParams, 'RowIdx' | 'RowValue'> & {
      InitialValue: string;
    }
  ) => void;
  updateSettingList: () => void;
};

export const FlutterSettingContext = createContext<
  FlutterSettingContextValue | undefined
>(undefined);

export const FlutterSettingProvider = ({ children }: PropsWithChildren) => {
  const { currentService } = useSharedStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [flutterSettingList, setFlutterSettingList] = useState<
    FlutterSetting[]
  >([]);
  const [filteredSettingList, setFilteredSettingList] = useState<
    FlutterSetting[]
  >([]);
  const [editedSettingList, setEditedSettingList] = useState<
    SetFlutterCustomConfigParams[]
  >([]);
  const { mutateAsync } = useSetFlutterSettingMutation();
  const queryClient = useQueryClient();
  const serviceID = currentService!.serviceID;

  const resetEditedSettingList = () => {
    setEditedSettingList([]);
  };
  // 변경된 값 모음에 추가
  const addToEditedList = (
    editedSetting: Pick<SetFlutterCustomConfigParams, 'RowIdx' | 'RowValue'> & {
      InitialValue: string | string[];
    }
  ) => {
    const { RowIdx, RowValue, InitialValue } = editedSetting;

    const rowValueForChecking: string | string[] =
      typeof InitialValue === 'object'
        ? getArrayFromString(RowValue)
        : RowValue;

    const isBackToOrig =
      typeof InitialValue === 'string'
        ? (rowValueForChecking as string).trim() === InitialValue.trim()
        : typeof InitialValue === 'object'
        ? [...(rowValueForChecking as string[])].toString() ==
          [...InitialValue].toString()
        : rowValueForChecking === InitialValue;

    if (isBackToOrig) {
      setEditedSettingList((prev) =>
        prev.filter((item) => item.RowIdx !== RowIdx)
      );
    } else {
      const newSetting: SetFlutterCustomConfigParams = {
        serviceID,
        RowIdx,
        RowValue: RowValue.trim(),
      };
      setEditedSettingList((prev) => {
        const isExist = prev.find((item) => item.RowIdx === newSetting.RowIdx);
        if (isExist) {
          return prev.map((item) =>
            item.RowIdx === newSetting.RowIdx ? newSetting : item
          );
        }
        return [...prev, newSetting];
      });
    }
  };
  // 변경된 값 모음을 서버에 반영
  const updateSettingList = () => {
    editedSettingList.forEach((item) => {
      mutateAsync(item, {
        onSuccess: () => {
          toast.success(
            <Typography variant="body2">변경사항이 적용되었습니다</Typography>
          );
          queryClient.invalidateQueries({
            queryKey:
              QUERY_KEYS['flutter-setting']['custom-config'](serviceID)
                .queryKey,
          });
        },
      });
    });
    resetEditedSettingList();
  };
  return (
    <FlutterSettingContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        flutterSettingList,
        setFlutterSettingList,
        filteredSettingList,
        setFilteredSettingList,
        editedSettingList,
        resetEditedSettingList,
        addToEditedList,
        updateSettingList,
      }}
    >
      {children}
    </FlutterSettingContext.Provider>
  );
};
