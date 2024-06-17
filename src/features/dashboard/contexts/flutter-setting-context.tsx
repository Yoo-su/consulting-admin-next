'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { FlutterSetting } from '../types/flutter-setting.type';

export type FlutterSettingContextValue = {
  flutterSettingList: FlutterSetting[];
  setFlutterSettingList: Dispatch<SetStateAction<FlutterSetting[]>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export const FlutterSettingContext = createContext<FlutterSettingContextValue | undefined>(undefined);

export type FlutterSettingProviderProps = {
  children: ReactNode;
};

const FlutterSettingProvider = ({ children }: FlutterSettingProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [flutterSettingList, setFlutterSettingList] = useState<FlutterSetting[]>([]);

  return (
    <FlutterSettingContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        flutterSettingList,
        setFlutterSettingList,
      }}
    >
      {children}
    </FlutterSettingContext.Provider>
  );
};

export default FlutterSettingProvider;
