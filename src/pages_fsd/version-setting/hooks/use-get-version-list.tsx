'use client';

import { useCallback, useState } from 'react';

import { getVersionList } from '../apis';
import { CurTBLVersion } from '../models';

export const useGetVersionList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testVersionList, setTestVersionList] = useState<CurTBLVersion[]>([]);
  const [realVersionList, setRealVersionList] = useState<CurTBLVersion[]>([]);

  const execute = (serviceID: string) => {
    setIsLoading(true);
    getVersionList(serviceID)
      .then((res) => {
        res.data.forEach((version) => {
          if (version.server === 'testDb') {
            setTestVersionList(version.curTBLVersion);
          }
          if (version.server === 'realDb') {
            setRealVersionList(version.curTBLVersion);
          }
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setTestVersionList([]);
        setRealVersionList([]);
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    testVersionList,
    setTestVersionList,
    realVersionList,
    setRealVersionList,
    execute: useCallback(execute, []),
  };
};
