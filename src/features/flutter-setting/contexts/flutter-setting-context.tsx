'use client';

import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import { createContext, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { FlutterSetting } from '../models';
import { SetFlutterCustomConfigParams } from '../apis';
import { useUnivService } from '@/shared/hooks/context';
import { useSetFlutterSettingMutation } from '../hooks';

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
    editedSetting: Pick<SetFlutterCustomConfigParams, 'RowIdx' | 'RowValue'> & { InitialValue: string }
  ) => void;
  updateSettingList: () => void;
};

export const FlutterSettingContext = createContext<FlutterSettingContextValue | undefined>(undefined);

const FlutterSettingProvider = ({ children }: PropsWithChildren) => {
  const { currentService } = useUnivService();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [flutterSettingList, setFlutterSettingList] = useState<FlutterSetting[]>([]);
  const [filteredSettingList, setFilteredSettingList] = useState<FlutterSetting[]>([]);
  const [editedSettingList, setEditedSettingList] = useState<SetFlutterCustomConfigParams[]>([]);
  const { mutateAsync } = useSetFlutterSettingMutation();
  const queryClient = useQueryClient();
  const serviceID = currentService!.serviceID;

  const resetEditedSettingList = () => {
    setEditedSettingList([]);
  };
  // 변경된 값 모음에 추가
  const addToEditedList = (
    editedSetting: Pick<SetFlutterCustomConfigParams, 'RowIdx' | 'RowValue'> & { InitialValue: string }
  ) => {
    const { RowIdx, RowValue, InitialValue } = editedSetting;

    const isBackToOrig = RowValue.trim() === InitialValue.trim();
    if (isBackToOrig) {
      setEditedSettingList((prev) => prev.filter((item) => item.RowIdx !== RowIdx));
    } else {
      const newSetting: SetFlutterCustomConfigParams = {
        serviceID,
        RowIdx,
        RowValue: RowValue.trim(),
      };
      setEditedSettingList((prev) => {
        const isExist = prev.find((item) => item.RowIdx === newSetting.RowIdx);
        if (isExist) {
          return prev.map((item) => (item.RowIdx === newSetting.RowIdx ? newSetting : item));
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
          toast.success(<Typography variant="body2">변경사항이 적용되었습니다</Typography>);
          queryClient.invalidateQueries({ queryKey: ['flutter-custom-config', { serviceID }] });
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

export default FlutterSettingProvider;
