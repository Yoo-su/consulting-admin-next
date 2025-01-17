import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Tooltip } from '@mui/material';
import { MouseEvent } from 'react';

import { useConfirmToast } from '@/shared/hooks';

import { useConsultingFileSettings } from '../../hooks';
import { CustomWidthBoxCell, TableRowBox } from '../elements';

export const TableHeader = () => {
  const { files, deleteFile } = useConsultingFileSettings();
  const { openConfirmToast } = useConfirmToast();

  const handleDeleteFile = (_: MouseEvent<HTMLElement>) => {
    const deleteAllFiles = () => {
      for (let i = 0; i < files.length; i++) {
        deleteFile(files, 1);
      }
    };
    openConfirmToast({
      id: 'delete-all-files',
      message: '전부 삭제하시겠습니까?',
      callbackConfirm: deleteAllFiles,
    });
  };

  return (
    <TableRowBox>
      <CustomWidthBoxCell size="xs" style={{ width: '8px' }} />
      <CustomWidthBoxCell typo={true} size="s">
        순서
      </CustomWidthBoxCell>
      <CustomWidthBoxCell typo={true} size="m">
        자료명
      </CustomWidthBoxCell>
      <CustomWidthBoxCell typo={true} size="m">
        파일명
      </CustomWidthBoxCell>
      <CustomWidthBoxCell typo={true} size="s" style={{ paddingRight: 0 }}>
        삭제
      </CustomWidthBoxCell>
      <CustomWidthBoxCell size="xs" style={{ paddingLeft: 0 }}>
        <Tooltip title="전체 삭제">
          <IconButton
            disableRipple
            sx={{ paddingLeft: 0, marginLeft: '-8px' }}
            onClick={handleDeleteFile}
          >
            <ClearIcon color="warning" fontSize="small" />
          </IconButton>
        </Tooltip>
      </CustomWidthBoxCell>
    </TableRowBox>
  );
};
