import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Tooltip } from '@mui/material';
import { memo } from 'react';

import { ButtonIcon } from '@/shared/components';

type AddDirectoryButtonProps = {
  handleOpenDialog: () => void;
};
export const AddDirectoryButton = memo(({ handleOpenDialog }: AddDirectoryButtonProps) => {
  return (
    <Tooltip title={'폴더추가'}>
      <ButtonIcon Icon={CreateNewFolderIcon} onClick={handleOpenDialog} />
    </Tooltip>
  );
});
AddDirectoryButton.displayName = 'AddDirectoryButton';
