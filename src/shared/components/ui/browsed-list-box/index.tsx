import { useMemo } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { IconButton, Stack, Tooltip, Typography, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FileIcon from './file-icon';
import BrowserDirectory from './browser-folder';
import BrowserFile from './browser-file';
import LoadingCover from '../loadings/loading-cover';
import { useHandleBrowser } from '@/shared/hooks/use-handle-browser';
import { useFileDropZone } from '@/shared/hooks/use-file-drop-zone';
import { toast } from 'react-hot-toast';

type BrowsedListBoxProps = {
  initialPath: string;
  showCurrentPath?: boolean;
  isDropZone?: boolean;
};
const BrowsedListBox = ({ initialPath, showCurrentPath = true, isDropZone = false }: BrowsedListBoxProps) => {
  const { browsedList, currentPath, isNotRoot, handleClickFolder, handleClickPrevBtn, isBrowsing } =
    useHandleBrowser(initialPath);
  const { isDragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useFileDropZone({
    onDrop: () => {
      if (!isDropZone) {
        toast.error(<Typography variant={'caption'}>{'드롭 영역이 아닙니다.'}</Typography>);
        return;
      }
    },
  });

  const displayingPath = useMemo(() => {
    const parts = currentPath.split('/');
    return parts.slice(1).join('/');
  }, [currentPath]);

  return (
    <Stack
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      direction={'column'}
      gap={1.5}
      padding={1}
      sx={{ bgcolor: 'grey.50', borderRadius: '0.2rem' }}
    >
      <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} height={'35px'}>
        <Stack direction={'row'} alignItems={'center'} gap={2} ml={1}>
          {showCurrentPath && (
            <Stack
              direction={'row'}
              sx={{
                bgcolor: '#fff',
                width: 'fit-content',
                borderRadius: '0.3rem',
                padding: '0.3rem',
                transition: 'width 0.2s linear',
                border: '1px solid #B6BBBF',
                alignItems: 'center',
              }}
            >
              <Typography variant="caption" color={'grey.700'}>
                현재경로: <b>{displayingPath}</b>
              </Typography>
            </Stack>
          )}
          <Typography variant={'body2'} color={'grey.700'}>{`${browsedList?.length}건`}</Typography>
        </Stack>

        {isNotRoot && (
          <Stack direction={'row'} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <Tooltip title={'이전으로'} followCursor>
              <IconButton size={'small'} onClick={handleClickPrevBtn}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Stack>

      <Grid
        container
        gap={2}
        sx={{
          position: 'relative',
          paddingX: 1.5,
          paddingY: 2.5,
          height: '420px',
          overflowY: 'scroll',
          border: '1px solid rgba(0,0,0,0.1)',
          bgcolor: '#fff',
        }}
      >
        {isBrowsing ? (
          <LoadingCover loadingMessage={'자료를 불러오는 중입니다 . .'} />
        ) : (
          browsedList?.map((browserItem) => {
            if (browserItem.isDirectory)
              return (
                <Grid
                  display={'flex'}
                  key={browserItem.name}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'fit-content'}
                  xs={3}
                  md={2}
                  lg={1}
                  xl={1}
                >
                  <BrowserDirectory browserItem={browserItem} handleClickFolder={handleClickFolder} />
                </Grid>
              );
            else {
              const extension = browserItem.name.split('.')[1];
              return (
                <Grid
                  display={'flex'}
                  key={browserItem.name}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'fit-content'}
                  sx={{
                    userSelect: 'none',
                  }}
                  xs={3}
                  md={2}
                  lg={1}
                  xl={1}
                >
                  <BrowserFile {...browserItem} imageChildren={<FileIcon extension={extension} />} />
                </Grid>
              );
            }
          })
        )}
      </Grid>
    </Stack>
  );
};

export default BrowsedListBox;
