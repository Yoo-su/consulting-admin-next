import { useTypographyToast } from '@/shared/hooks';
import { TEXT_COPY_MESSAGE } from '../constants';

export const copyText = async (
  copiedText: string,
  title: string | undefined = ''
) => {
  const { showSuccess, showError } = useTypographyToast();
  const addedTitle = title ? title + ' ' : '';
  try {
    await navigator.clipboard.writeText(copiedText).then(() => {
      showSuccess(addedTitle + TEXT_COPY_MESSAGE.COPY_SUCCESS);
    });
  } catch (e) {
    showError(TEXT_COPY_MESSAGE.COPY_FAILED);
  }
};
