'use client';

import { Tooltip, Typography } from '@mui/material';
import { memo, useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

import { formatKoreanTextCompareDatesFromNow } from '@/shared/services';

import { useItemStyle } from '../../hooks';
import { useBrowserStore } from '../../models';
import { FileIcon } from '../file-icon';

type BrowserDirectoryProps = {
  directoryName: string;
};
export const BrowserDirectory = memo(
  ({ directoryName }: BrowserDirectoryProps) => {
    const { currentPath, setCurrentPath } = useBrowserStore(
      useShallow((state) => ({
        currentPath: state.currentPath,
        setCurrentPath: state.setCurrentPath,
      }))
    );
    const { Wrapper, InfoArea } = useItemStyle();

    // 디렉토리 아이템 클릭 처리
    const handleClickDirectory = useCallback(() => {
      const newPath = currentPath + '/' + directoryName;
      setCurrentPath(newPath);
    }, [currentPath]);

    return (
      <Tooltip title={`${directoryName}폴더로 이동`} followCursor>
        <Wrapper onClick={handleClickDirectory}>
          <FileIcon contentType={'directory'} />
          <InfoArea className={'info-area'}>
            <Typography className={'item-name'} variant={'caption'}>
              {directoryName}
            </Typography>
          </InfoArea>
        </Wrapper>
      </Tooltip>
    );
  }
);
BrowserDirectory.displayName = 'BrowserDirectory';
