import { Typography } from '@mui/material';
import toast from 'react-hot-toast';

import { TEXT_COPY_MESSAGE } from '../constants';

export const copyText = async (
  copiedText: string,
  title: string | undefined = ''
) => {
  const addedTitle = title ? title + ' ' : '';
  try {
    await navigator.clipboard.writeText(copiedText).then(() => {
      toast.success(
        <Typography variant="body2">
          {addedTitle}
          {TEXT_COPY_MESSAGE.COPY_SUCCESS}
        </Typography>
      );
    });
  } catch (e) {
    toast.success(
      <Typography variant="body2">{TEXT_COPY_MESSAGE.COPY_FAILED}</Typography>
    );
  }
};
