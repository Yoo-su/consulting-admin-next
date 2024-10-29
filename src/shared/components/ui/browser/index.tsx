import { useMemo, DragEvent } from 'react';
import { Stack, Typography, Grid, Fab } from '@mui/material';
import { toast } from 'react-hot-toast';
import UploadIcon from '@mui/icons-material/Upload';

import LoadingCover from '../loadings/loading-cover';
import BrowserHeader from './header';
import FileList from './file-list';
import Queue from './queue';
import { useHandleBrowser } from '@/shared/hooks/use-handle-browser';
import { useFileDropZone } from '@/shared/hooks/use-file-drop-zone';

type BrowserProps = {
  initialPath: string;
  showCurrentPath?: boolean;
  isDropZone?: boolean;
};
const Browser = ({ initialPath, showCurrentPath = false, isDropZone = false }: BrowserProps) => {
  const { browsedList, displayingPath, isNotRoot, handleClickFolder, handleClickPrevBtn, isBrowsing } =
    useHandleBrowser(initialPath);
  const {
    isDragging,
    queueFiles,
    handleDragEnter,
    handleAddFiles,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleRemoveFile,
  } = useFileDropZone({
    onDrop: (event: DragEvent<HTMLDivElement>) => {
      handleOnDrop(event);
    },
  });

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!isDropZone) {
      toast.error(<Typography variant={'caption'}>{'드롭 허용 영역이 아닙니다.'}</Typography>);
      return;
    }
    const arrayFiles = Array.from(event.dataTransfer.files);
    if (!arrayFiles.length) return;
    else handleAddFiles(arrayFiles);
  };

  return (
    <Stack
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      direction={'column'}
      gap={1.5}
      padding={1}
      sx={{ position: 'relative', bgcolor: 'grey.50', borderRadius: '0.2rem' }}
    >
      <BrowserHeader
        displayingPath={displayingPath}
        fileCount={browsedList?.length ?? 0}
        showCurrentPath={showCurrentPath}
        isNotRoot={isNotRoot}
        onClickPrev={handleClickPrevBtn}
      />

      <Grid
        container
        gap={2}
        sx={{
          position: 'relative',
          paddingX: 1.5,
          paddingY: 2.5,
          height: '480px',
          overflowY: 'scroll',
          border: '1px solid rgba(0,0,0,0.1)',
          bgcolor: '#fff',
        }}
      >
        {isBrowsing ? (
          <LoadingCover loadingMessage={'자료를 불러오는 중입니다 . .'} />
        ) : (
          <FileList browsedList={browsedList ?? []} handleClickFolder={handleClickFolder} />
        )}

        <Queue queueFiles={queueFiles} handleRemoveFile={handleRemoveFile} />
      </Grid>
      {queueFiles.length > 0 && (
        <Fab
          variant={'extended'}
          color={'info'}
          size={'medium'}
          sx={{
            position: 'absolute',
            bottom: 30,
            right: 30,
          }}
        >
          <UploadIcon sx={{ mr: 1 }} />
          <Typography variant={'body2'}>{`${queueFiles.length}개의 파일 업로드`}</Typography>
        </Fab>
      )}
    </Stack>
  );
};

export default Browser;
