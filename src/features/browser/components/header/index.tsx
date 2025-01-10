'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Stack, styled, Tooltip, Typography } from '@mui/material';
import { memo } from 'react';
import { useShallow } from 'zustand/shallow';

import { ButtonIcon } from '@/shared/components';

import { useBrowserHeader } from '../../hooks';
import { useBrowserStore } from '../../models';
import { SortSelect } from './sort-select';

type BrowserHeaderProps = {
  handleClickInput: () => void;
};
export const BrowserHeader = memo(
  ({ handleClickInput }: BrowserHeaderProps) => {
    const {
      displayingPath,
      dataCnt,
      isNotRoot,
      handleClickFolderBtn,
      handleClickPrevBtn,
    } = useBrowserHeader();
    const { browserOption } = useBrowserStore();

    return (
      <Stack direction="row" alignItems="center" flexWrap="wrap" height="35px">
        <Stack direction="row" alignItems="center" gap={2} ml={1}>
          {browserOption.showCurrentPath && (
            <CurrentPathBox direction="row">
              <Typography variant="caption" color="grey.700">
                현재경로: <b>{displayingPath}</b>
              </Typography>
            </CurrentPathBox>
          )}
          <SortSelect />
          <Typography
            variant="body2"
            color="grey.700"
          >{`${dataCnt}건`}</Typography>
        </Stack>

        <Stack
          direction="row"
          gap={1.5}
          sx={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
          {browserOption.appendDirectory && (
            <Tooltip title={'폴더추가'}>
              <ButtonIcon
                Icon={CreateNewFolderIcon}
                onClick={handleClickFolderBtn}
              />
            </Tooltip>
          )}
          {browserOption.isDropZone && (
            <Tooltip title={'파일추가'}>
              <ButtonIcon Icon={UploadFileIcon} onClick={handleClickInput} />
            </Tooltip>
          )}
          {isNotRoot && (
            <Tooltip title={'이전으로'} followCursor>
              <ButtonIcon Icon={ArrowBackIcon} onClick={handleClickPrevBtn} />
            </Tooltip>
          )}
        </Stack>
      </Stack>
    );
  }
);
BrowserHeader.displayName = 'BrowserHeader';

const CurrentPathBox = styled(Stack)({
  bgcolor: '#fff',
  width: 'fit-content',
  borderRadius: '0.3rem',
  padding: '0.3rem',
  transition: 'width 0.2s linear',
  border: '1px solid #B6BBBF',
  alignItems: 'center',
});
