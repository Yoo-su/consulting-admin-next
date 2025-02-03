'use client';

import { Dialog, DialogContent, DialogTitle, Grid, styled, SxProps } from '@mui/material';
import { DragEvent, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useQueueStore } from '@/features/browser/models';
import { DropZoneContainer, SaveDataButton } from '@/shared/components';

import { QueueFile } from '../queue-file';
import { AnnouncementBox } from './announcement-box';
import { DirectoryNameInput } from './directory-name-input';

type FormValues = {
  directoryName: string;
};
type AddDirectoryDialogProps = {
  isUploading?: boolean;
  handleUploadDialogQueue: (directory: string) => Promise<void>;
};
export const AddDirectoryDialog = ({ isUploading, handleUploadDialogQueue }: AddDirectoryDialogProps) => {
  const { dialogQueue, isAddDirectoryDialogOpen, closeAddDirectoryDialog, addDialogQueueFiles, removeDialogQueueFile } =
    useQueueStore();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset: resetDirectoryName,
  } = useForm<FormValues>({
    defaultValues: {
      directoryName: '',
    },
  });

  const isReadyToUpload = !!dialogQueue.length && !!watch('directoryName');

  const onSubmit = handleSubmit(async (data) => {
    if (!dialogQueue.length) return;
    await handleUploadDialogQueue(data.directoryName);
    handleCloseDialog();
  });

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const arrayFiles = Array.from(event.dataTransfer.files);
    if (!arrayFiles.length) return;

    const existingFileNames = new Set(dialogQueue.map((file) => file.name));
    const uniqueFiles = arrayFiles.filter((file) => !existingFileNames.has(file.name));
    addDialogQueueFiles(uniqueFiles);
  };

  const handleCloseDialog = useCallback(() => {
    resetDirectoryName();
    closeAddDirectoryDialog();
  }, []);

  return (
    <Dialog open={isAddDirectoryDialogOpen} onClose={handleCloseDialog} aria-hidden={!isAddDirectoryDialogOpen}>
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <DirectoryNameInput control={control} errors={errors} />
        </DialogTitle>

        <DialogContent>
          <DropZoneContainer onDrop={handleDrop} sx={DropZoneContainerStyles}>
            <GridContainer container>
              {dialogQueue.length ? (
                dialogQueue.map((item) => (
                  <QueueFile
                    key={item.name}
                    name={item.name}
                    type={item.type}
                    handleRemoveFile={removeDialogQueueFile}
                  />
                ))
              ) : (
                <AnnouncementBox />
              )}
            </GridContainer>

            {isReadyToUpload && (
              <SaveDataButton
                label={`${dialogQueue.length}개의 파일 업로드`}
                disabled={isUploading}
                handleBtnClick={onSubmit}
              />
            )}
          </DropZoneContainer>
        </DialogContent>
      </form>
    </Dialog>
  );
};

// Styled Components
const GridContainer = styled(Grid)(({ theme }) => ({
  rowGap: 10,
  position: 'relative',
  padding: theme.spacing(2.5, 1.5),
  minHeight: 'fit-content',
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
