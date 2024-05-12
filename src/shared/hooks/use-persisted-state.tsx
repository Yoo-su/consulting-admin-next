'use client';

import { useState, useEffect } from 'react';

type StorageType = 'local' | 'session';

/**
 *
 * @param initialState 이니셜 값
 * @param storageType 저장소 유형 (로컬 스토리지, 세션 스토리지)
 * @param key 값 저장,조회,삭제 시 사용할 키
 * @returns
 */
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
