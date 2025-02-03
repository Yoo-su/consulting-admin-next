'use client';

import Stack from '@mui/material/Stack';
import { memo } from 'react';

import { useBrowserHeader } from '../../hooks';
import { useBrowserStore } from '../../models';
import { AddDirectoryButton } from './add-directory-button';
import { AddFileButton } from './add-file-button';
import { CurrentPath } from './current-path';
import { ItemCount } from './item-count';
import { PrevButton } from './prev-button';
import { SortSelect } from './sort-select';

type BrowserHeaderProps = {
  handleClickInput: () => void;
};
export const BrowserHeader = memo(({ handleClickInput }: BrowserHeaderProps) => {
  const { displayingPath, dataCnt, isNotRoot, handleClickFolderBtn, handleClickPrevBtn } = useBrowserHeader();
  const { appendDirectory, showCurrentPath, isDropZone } = useBrowserStore((state) => state.browserOption);

  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" height="35px">
      <Stack direction="row" alignItems="center" gap={2} ml={1}>
        {showCurrentPath && <CurrentPath displayingPath={displayingPath} />}
        <SortSelect />
        <ItemCount dataCnt={dataCnt} />
      </Stack>

      <Stack direction="row" gap={1.5} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        {appendDirectory && <AddDirectoryButton handleOpenDialog={handleClickFolderBtn} />}
        {isDropZone && <AddFileButton handleOpenInput={handleClickInput} />}
        {isNotRoot && <PrevButton handleMoveToPrev={handleClickPrevBtn} />}
      </Stack>
    </Stack>
  );
});
BrowserHeader.displayName = 'BrowserHeader';
