import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

import { useFileEditHandler } from '@/pages_fsd/consulting-file-setting/hooks';
import { ConsultingFile } from '@/pages_fsd/consulting-file-setting/models';

type FileEditDeleteProps = {
  file: ConsultingFile;
};

export const FileEditDelete = ({ file }: FileEditDeleteProps) => {
  const { handleDeleteFile } = useFileEditHandler({ file });
  return (
    <IconButton disableRipple onClick={handleDeleteFile} id={`deleteFile-${file.RefNo}`}>
      <ClearIcon color="warning" fontSize="small" />
    </IconButton>
  );
};
