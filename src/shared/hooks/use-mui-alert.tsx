import { AlertColor } from '@mui/material/Alert';
import { useState } from 'react';

export const useMuiAlert = () => {
  const [alertData, setAlertData] = useState<{ message: string; color: AlertColor } | null>(null);

  return { alertData, setAlertData };
};
