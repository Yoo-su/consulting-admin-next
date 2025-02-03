'use client';

import { Tooltip, Typography } from '@mui/material';
import { memo, useCallback } from 'react';

import { useItemStyle } from '../hooks';
import { useBrowserStore } from '../models';
import { FileIcon } from './file-icon';

type BrowserDirectoryProps = {
  directoryName: string;
};
export const BrowserDirectory = memo(({ directoryName }: BrowserDirectoryProps) => {
  const currentPath = useBrowserStore((state) => state.currentPath);
  const setCurrentPath = useBrowserStore((state) => state.setCurrentPath);
  const { GridItemWrapper, BrowserItemWrapper, BrowserInfoArea } = useItemStyle();

  // 디렉토리 아이템 클릭 처리
  const handleClickDirectory = useCallback(() => {
    const newPath = currentPath + '/' + directoryName;
    setCurrentPath(newPath);
  }, [currentPath]);

  return (
    <GridItemWrapper>
      <Tooltip title={`${directoryName}폴더로 이동`} followCursor>
        <BrowserItemWrapper onClick={handleClickDirectory}>
          <FileIcon contentType={'directory'} />
          <BrowserInfoArea className={'info-area'}>
            <Typography className={'item-name'} variant={'caption'}>
              {directoryName}
            </Typography>
          </BrowserInfoArea>
        </BrowserItemWrapper>
      </Tooltip>
    </GridItemWrapper>
  );
});
BrowserDirectory.displayName = 'BrowserDirectory';
