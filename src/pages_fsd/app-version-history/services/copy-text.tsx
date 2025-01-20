import { Typography } from '@mui/material';
import toast from 'react-hot-toast';

export const copyText = async (
  copiedText: string,
  title: string | undefined = ''
) => {
  const addedTitle = title ? title + ' ' : '';
  try {
    await navigator.clipboard.writeText(copiedText).then(() => {
      toast.success(
        <Typography variant="body2">{addedTitle}복사되었습니다</Typography>
      );
    });
  } catch (e) {
    toast.error(<Typography variant="body2">복사에 실패했습니다</Typography>);
  }
};
