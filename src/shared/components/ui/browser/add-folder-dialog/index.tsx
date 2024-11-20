import FolderIcon from '@mui/icons-material/Folder';
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
import { DragEvent, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useQueueStore } from '@/shared/models/stores';

import DropZoneContainer from '../../drop-zone-container';
import FileIcon from '../atoms/file-icon';
import QueueFile from '../atoms/queue-file';
import UploadButton from '../atoms/upload-button';
import AnnouncementBox from './announcement-box';
import { directoryNameValidation } from './validation-rule';

type FormValues = {
  directoryName: string;
};
type AddFolderDialogProps = {
  handleUploadDialogQueue: (queue: File[], directory: string) => Promise<void>;
};

const AddFolderDialog = ({ handleUploadDialogQueue }: AddFolderDialogProps) => {
  const {
    dialogQueue,
    isAddFolderModalOpen,
    closeAddFolderModal,
    addDialogQueueFiles,
    removeDialogQueueFile,
  } = useQueueStore();
  const {
    control,
    handleSubmit,
    getValues,
    reset: resetDirectoryName,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      directoryName: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!dialogQueue.length) return;
    await handleUploadDialogQueue(dialogQueue, getValues('directoryName'));
    resetDirectoryName();
    closeAddFolderModal();
  });

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const arrayFiles = Array.from(event.dataTransfer.files);
    if (!arrayFiles.length) return;
    else {
      const existingFileNames = new Set(dialogQueue.map((file) => file.name));
      const uniqueFiles = arrayFiles.filter(
        (file) => !existingFileNames.has(file.name)
      );
      addDialogQueueFiles(uniqueFiles);
    }
  };

  const handleUploadQueue = useCallback(async () => {
    await handleUploadDialogQueue(dialogQueue, getValues('directoryName'));
    resetDirectoryName();
    closeAddFolderModal();
  }, [dialogQueue, getValues, resetDirectoryName, closeAddFolderModal]);

  return (
    <Dialog open={isAddFolderModalOpen} onClose={closeAddFolderModal}>
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <FolderIcon />
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
                    display="flex"
                    key={item.name}
                    justifyContent="center"
                    alignItems="center"
                    height="fit-content"
                    sx={{ userSelect: 'none' }}
                    md={4}
                    lg={2}
                    xl={2}
                  >
                    <QueueFile
                      fileName={item.name}
                      imageChildren={<FileIcon contentType={item.type} />}
                      handleRemoveFile={() => {
                        removeDialogQueueFile(item.name);
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <AnnouncementBox />
              )}
            </GridBox>

            <UploadButton queue={dialogQueue} handleQueue={handleUploadQueue} />
          </DropZoneContainer>
        </DialogContent>
      </form>
    </Dialog>
  );
};

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

export default AddFolderDialog;
