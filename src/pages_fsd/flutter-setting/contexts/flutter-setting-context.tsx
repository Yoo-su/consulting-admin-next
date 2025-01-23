'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

import { QUERY_KEYS } from '@/shared/constants';
import { useTypographyToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { SetFlutterCustomConfigParams } from '../apis';
import { FLUTTER_SETTING_MESSAGE } from '../constants';
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
  const { showSuccess } = useTypographyToast();
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

  const resetEditedSettingList = useCallback(() => {
    setEditedSettingList([]);
  }, []);

  const isValueBackToOrig = useCallback(
    (InitialValue: string | string[], RowValue: string) => {
      const rowValueForChecking: string | string[] =
        typeof InitialValue === 'object'
          ? getArrayFromString(RowValue)
          : RowValue;

      switch (typeof InitialValue) {
        case 'string':
          return (rowValueForChecking as string).trim() === InitialValue.trim();
        case 'object':
          return (
            [...(rowValueForChecking as string[])].toString() ==
            [...InitialValue].toString()
          );
        default:
          return rowValueForChecking === InitialValue;
      }
    },
    []
  );
  // 변경된 값 모음에 추가
  const addToEditedList = useCallback(
    (
      editedSetting: Pick<
        SetFlutterCustomConfigParams,
        'RowIdx' | 'RowValue'
      > & {
        InitialValue: string | string[];
      }
    ) => {
      const { RowIdx, RowValue, InitialValue } = editedSetting;
      const isOrig = isValueBackToOrig(InitialValue, RowValue);

      if (isOrig) {
        setEditedSettingList((prev) =>
          prev.filter((item) => item.RowIdx !== RowIdx)
        );
        return;
      }
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
    },
    []
  );
  // 변경된 값 모음을 서버에 반영
  const updateSettingList = useCallback(() => {
    editedSettingList.forEach((item) => {
      mutateAsync(item, {
        onSuccess: () => {
          showSuccess(FLUTTER_SETTING_MESSAGE.UPDATE_SUCCESS);
          queryClient.invalidateQueries({
            queryKey:
              QUERY_KEYS['flutter-setting']['custom-config'](serviceID)
                .queryKey,
          });
        },
      });
    });
    resetEditedSettingList();
  }, [editedSettingList]);
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
