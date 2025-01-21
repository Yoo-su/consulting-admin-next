import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Tooltip } from '@mui/material';
import { MouseEvent } from 'react';

import { useConsultingFileSettings } from '@/pages_fsd/consulting-file-setting/hooks';
import { useConfirmToast } from '@/shared/hooks';

export const FileDeleteAll = () => {
  const { files, deleteFile } = useConsultingFileSettings();
  const { openConfirmToast } = useConfirmToast();

  const handleDeleteFile = (_: MouseEvent<HTMLElement>) => {
    const deleteAllFiles = async () => {
      for (let i = 0; i < files.length; i++) {
        await deleteFile(files, 1);
      }
    };
    openConfirmToast({
      id: 'delete-all-files',
      message: '전부 삭제하시겠습니까?',
      callbackConfirm: deleteAllFiles,
    });
  };
  return (
    <Tooltip title="전체 삭제">
      <IconButton
        disableRipple
        sx={{ paddingLeft: 0, marginLeft: '-8px' }}
        onClick={handleDeleteFile}
      >
        <ClearIcon color="warning" fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
