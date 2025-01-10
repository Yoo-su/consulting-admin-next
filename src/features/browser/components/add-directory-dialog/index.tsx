// React Component for Add Directory Dialog
'use client';

import DirectoryIcon from '@mui/icons-material/Folder';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  styled,
  SxProps,
  TextField,
} from '@mui/material';
import { DragEvent, useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { useBrowserStore, useQueueStore } from '@/features/browser/models';
import { DropZoneContainer, SaveDataButton } from '@/shared/components';

import { QueueFile } from '../queue/queue-file';
import { AnnouncementBox } from './announcement-box';
import { directoryNameValidation } from './validation-rule';

// Type Definitions
type FormValues = {
  directoryName: string;
};

type AddDirectoryDialogProps = {
  isUploadPending?: boolean;
  handleUploadDialogQueue: (directory: string) => Promise<void>;
};

// Main Component
export const AddDirectoryDialog = ({
  isUploadPending,
  handleUploadDialogQueue,
}: AddDirectoryDialogProps) => {
  // State Management
  const {
    dialogQueue,
    isAddDirectoryDialogOpen,
    closeAddDirectoryDialog,
    addDialogQueueFiles,
    removeDialogQueueFile,
  } = useQueueStore();

  const {
    control,
    handleSubmit,
    watch,
    reset: resetDirectoryName,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      directoryName: '',
    },
  });

  const directoryName = watch('directoryName');
  const itemAppearance = useBrowserStore(
    useShallow((state) => state.browserOption.itemAppearance)
  );

  // Event Handlers
  const onSubmit = handleSubmit(async (data) => {
    if (!dialogQueue.length) return;
    await handleUploadDialogQueue(directoryName);
    closeAddDirectoryDialog();
  });

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const arrayFiles = Array.from(event.dataTransfer.files);
    if (!arrayFiles.length) return;

    const existingFileNames = new Set(dialogQueue.map((file) => file.name));
    const uniqueFiles = arrayFiles.filter(
      (file) => !existingFileNames.has(file.name)
    );
    addDialogQueueFiles(uniqueFiles);
  };
  const handleCloseDialog = useCallback(() => {
    resetDirectoryName();
    closeAddDirectoryDialog();
  }, []);

  const handleUploadQueue = useCallback(async () => {
    await handleUploadDialogQueue(directoryName);
    resetDirectoryName();
    closeAddDirectoryDialog();
  }, [
    directoryName,
    handleUploadDialogQueue,
    resetDirectoryName,
    closeAddDirectoryDialog,
  ]);

  // Memoized Values
  const xsGridItemSize = useMemo(() => {
    return itemAppearance === 'card' ? 3 : 2;
  }, [itemAppearance]);

  const smGridItemSize = useMemo(() => {
    return itemAppearance === 'card' ? 4 : 2;
  }, [itemAppearance]);

  // Render
  return (
    <Dialog
      open={isAddDirectoryDialogOpen}
      onClose={handleCloseDialog}
      aria-hidden={!isAddDirectoryDialogOpen}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <Stack direction="row" alignItems="center" gap={1}>
            <DirectoryIcon />
            <Controller
              name="directoryName"
              control={control}
              rules={directoryNameValidation}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  size="small"
                  placeholder="폴더명을 입력하세요"
                  error={!!errors.directoryName}
                  helperText={errors.directoryName?.message}
                />
              )}
            />
          </Stack>
        </DialogTitle>

        <DialogContent>
          <DropZoneContainer onDrop={handleDrop} sx={DropZoneContainerStyles}>
            <GridBox container>
              {dialogQueue.length ? (
                dialogQueue.map((item) => (
                  <Grid
                    item
                    key={item.name}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="fit-content"
                    sx={{ userSelect: 'none' }}
                    xs={xsGridItemSize}
                    sm={smGridItemSize}
                  >
                    <QueueFile
                      name={item.name}
                      type={item.type}
                      handleRemoveFile={removeDialogQueueFile}
                    />
                  </Grid>
                ))
              ) : (
                <AnnouncementBox />
              )}
            </GridBox>

            {!!dialogQueue.length && directoryName && (
              <SaveDataButton
                label={`${dialogQueue.length}개의 파일 업로드`}
                disabled={isUploadPending}
                handleBtnClick={handleUploadQueue}
              />
            )}
          </DropZoneContainer>
        </DialogContent>
      </form>
    </Dialog>
  );
};

// Styled Components
const GridBox = styled(Grid)(({ theme }) => ({
  rowGap: 10,
  position: 'relative',
  padding: theme.spacing(2.5, 1.5),
  minHeight: '240px',
  maxHeight: '480px',
  overflowY: 'scroll',
  width: '480px',
  border: '1px solid rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  borderRadius: '0.2rem',
}));

const DropZoneContainerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};
