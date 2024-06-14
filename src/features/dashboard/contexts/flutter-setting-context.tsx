'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { FlutterSetting } from '../types/flutter-setting.type';
import { useGetFlutterSettingQuery } from '../hooks/tanstack/use-get-flutter-setting-query';

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

  const { refetch } = useGetFlutterSettingQuery();

  useEffect(() => {
    refetch().then((res) => {
      if (res.data) {
        setFlutterSettingList(res.data);
      }
    });
  }, []);

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
