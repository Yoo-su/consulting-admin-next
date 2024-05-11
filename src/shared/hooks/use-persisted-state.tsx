'use client';

import { useState, useEffect } from 'react';

type StorageType = 'local' | 'session';
export const usePersistedState = <T,>(
  initialState: T,
  storageType: StorageType,
  key: string
): [T, (value: T) => void] => {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    const storageVal = storage.getItem(key);
    if (storageVal) setState(JSON.parse(storageVal));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPersistedState = (value: T) => {
    setState(value);
    storage.setItem(key, JSON.stringify(value));
  };

  return [state, setPersistedState];
};
