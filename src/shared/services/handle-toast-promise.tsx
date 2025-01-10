import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';

const createToastMessage = (message: string) => (
  <Typography variant="caption">{message}</Typography>
);

export const handleToastPromise = (
  promise: Promise<any>,
  messages: { loading: string; success: string; error: string }
) => {
  return toast.promise(promise, {
    loading: createToastMessage(messages.loading),
    success: createToastMessage(messages.success),
    error: createToastMessage(messages.error),
  });
};
