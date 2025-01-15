'use client';

import { useCallback, useState } from 'react';

import { getVersionList } from '../apis';
import { CurTBLVersion, VersionServer } from '../models';

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

  const setVersionList = (
    label: VersionServer['label'],
    editedList: CurTBLVersion[]
  ) => {
    if (label === '테스트') {
      setTestVersionList(editedList);
    } else {
      setRealVersionList(editedList);
    }
  };

  const getCurrentVersionList = (label: VersionServer['label']) => {
    if (label === '테스트') {
      return testVersionList;
    } else {
      return realVersionList;
    }
  };

  return {
    isLoading,
    testVersionList,
    setTestVersionList,
    realVersionList,
    setRealVersionList,
    setVersionList,
    getCurrentVersionList,
    execute: useCallback(execute, []),
  };
};
