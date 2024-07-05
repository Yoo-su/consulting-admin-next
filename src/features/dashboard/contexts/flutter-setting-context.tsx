'use client';

import { createContext, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { FlutterSetting } from '../types/flutter-setting.type';
import { SetFlutterCustomConfigParams } from '../apis/set-flutter-custom-config';
import { useUnivService } from '../hooks/context/use-univ-service';
import { useSetFlutterSettingMutation } from '../hooks/tanstack/use-set-flutter-setting-mutation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

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
  const addToEditedList = (
    editedSetting: Pick<SetFlutterCustomConfigParams, 'RowIdx' | 'RowValue'> & { InitialValue: string }
  ) => {
    const { RowIdx, RowValue, InitialValue } = editedSetting;
    console.log('flutter', `"${InitialValue}"`);
    const isBackToOrig = RowValue.trim() === InitialValue.trim();
    if (isBackToOrig) {
      setEditedSettingList((prev) => prev.filter((item) => item.RowIdx !== RowIdx));
    } else {
      const newSetting: SetFlutterCustomConfigParams = {
        serviceID,
        RowIdx,
        RowValue,
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
  const updateSettingList = () => {
    editedSettingList.forEach((item) => {
      mutateAsync(item, {
        onSuccess: () => {
          console.log('onSuccess');
          toast.success('변경사항이 적용되었습니다.');
          queryClient.invalidateQueries({ queryKey: ['flutter-setting', { serviceID }] });
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
