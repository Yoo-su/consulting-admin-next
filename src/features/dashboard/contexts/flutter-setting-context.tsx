'use client';

import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

export type FlutterSettingContextValue = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export const FlutterSettingContext = createContext<FlutterSettingContextValue | undefined>(undefined);

export type FlutterSettingProviderProps = {
  children: ReactNode;
};

const FlutterSettingProvider = ({ children }: FlutterSettingProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <FlutterSettingContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </FlutterSettingContext.Provider>
  );
};

export default FlutterSettingProvider;
