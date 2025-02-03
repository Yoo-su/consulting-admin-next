import { Typography, TypographyTypeMap } from '@mui/material';
import { isValidElement, ReactNode } from 'react';
import toast, { ToastOptions } from 'react-hot-toast';

type ToastType = 'success' | 'error';
type ToastMessage = string | ReactNode;
type ToastVariant = TypographyTypeMap['props']['variant'];

interface UseToastReturn {
  showToast: (type: ToastType, message: ToastMessage, variant?: ToastVariant, options?: ToastOptions) => void;
  showError: (message: ToastMessage, variant?: ToastVariant, options?: ToastOptions) => void;
  showSuccess: (message: ToastMessage, variant?: ToastVariant, options?: ToastOptions) => void;
}

export const useTypographyToast = (): UseToastReturn => {
  const showToast = (
    type: ToastType,
    message: ToastMessage,
    variant: ToastVariant = 'body2',
    options?: ToastOptions
  ) => {
    if (typeof message === 'string') {
      toast[type](<Typography variant={variant}>{message}</Typography>, options);
    } else if (isValidElement(message)) {
      toast[type](message, options);
    } else {
      console.error('Invalid message type for useTypographyToast');
    }
  };
  return {
    showToast,
    showError: (message, variant, options) => showToast('error', message, variant, options),
    showSuccess: (message, variant, options) => showToast('success', message, variant, options),
  };
};
