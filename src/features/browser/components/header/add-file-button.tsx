import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Tooltip } from '@mui/material';
import { memo } from 'react';

import { ButtonIcon } from '@/shared/components';

type AddFileButtonProps = {
  handleOpenInput: () => void;
};
export const AddFileButton = memo(({ handleOpenInput }: AddFileButtonProps) => {
  return (
    <Tooltip title={'파일추가'}>
      <ButtonIcon Icon={UploadFileIcon} onClick={handleOpenInput} />
    </Tooltip>
  );
});
AddFileButton.displayName = 'AddFileButton';
