'use client';

import { useEffect, useState } from 'react';

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
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    // 클라이언트 측에서만 실행되도록 조건문 추가
    if (typeof window !== 'undefined') {
      const storage =
        storageType === 'local' ? window.localStorage : window.sessionStorage;
      const storageVal = storage.getItem(key);
      if (storageVal) setState(JSON.parse(storageVal));
    }
  }, []);

  const setPersistedState = (value: T) => {
    // 클라이언트 측에서만 실행되도록 조건문 추가
    if (typeof window !== 'undefined') {
      const storage =
        storageType === 'local' ? window.localStorage : window.sessionStorage;
      setState(value);
      storage.setItem(key, JSON.stringify(value));
    }
  };

  return [state, setPersistedState];
};
