'use client';

import { createContext, useState, Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { FlutterSetting } from '../types/flutter-setting.type';
import { SetFlutterCustomConfigParams } from '../apis/set-flutter-custom-config';
import { useUnivService } from '../hooks/context/use-univ-service';
import { useSetFlutterSettingMutation } from '../hooks/tanstack/use-set-flutter-setting-mutation';

export type FlutterSettingContextValue = {
  flutterSettingList: FlutterSetting[];
  setFlutterSettingList: Dispatch<SetStateAction<FlutterSetting[]>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  filteredSettingList: FlutterSetting[];
  setFilteredSettingList: Dispatch<SetStateAction<FlutterSetting[]>>;
  editedSettingList: SetFlutterCustomConfigParams[];
  addToEditedSettingList: (editedSetting: Pick<SetFlutterCustomConfigParams, 'RowIdx' | 'RowValue'>) => void;
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

  const addToEditedSettingList = (editedSetting: Pick<SetFlutterCustomConfigParams, 'RowIdx' | 'RowValue'>) => {
    const newSetting: SetFlutterCustomConfigParams = {
      serviceID: currentService!.serviceID,
      ...editedSetting,
    };
    setEditedSettingList((prev) => {
      const isExist = prev.find((item) => item.RowIdx === newSetting.RowIdx);
      if (isExist) {
        return prev.map((item) => (item.RowIdx === newSetting.RowIdx ? newSetting : item));
      }
      return [...prev, newSetting];
    });
  };
  const resetSettingList = () => {
    setEditedSettingList([]);
  };
  const updateSettingList = () => {
    editedSettingList.forEach((item) => {
      console.log('item', item);
      mutateAsync(item);
    });
    resetSettingList();
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
        // setEditedSettingList,
        addToEditedSettingList,
        updateSettingList,
      }}
    >
      {children}
    </FlutterSettingContext.Provider>
  );
};

export default FlutterSettingProvider;
