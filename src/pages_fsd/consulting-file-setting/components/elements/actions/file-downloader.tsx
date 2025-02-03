'use client';

import DownloadIcon from '@mui/icons-material/Download';
import { Button, CircularProgress, Typography } from '@mui/material';

import { useTypographyToast } from '@/shared/hooks';

import { DownloaderClass, FILE_MESSAGE } from '../../../constants';
import { useGetConsultingFileDownloadQuery } from '../../../hooks';
import { getFileType } from '../../../services';
import { CustomWidthBoxCell } from '../cells/table-boxes';

type FileDownloaderProps = {
  fileName: string;
};
export const FileDownloader = ({ fileName }: FileDownloaderProps) => {
  const { showError } = useTypographyToast();
  const { refetch, isFetching } = useGetConsultingFileDownloadQuery(fileName);

  const handleClick = async () => {
    try {
      const { data: fileContent } = await refetch();
      if (!fileContent) {
        throw new Error('DownloadFailed: Invalid or empty file received');
      }
      const fileType = getFileType(fileName);
      const blob = new Blob([fileContent], { type: fileType });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error(error);
      showError(FILE_MESSAGE.ERROR_DOWNLOADING);
    }
  };

  return (
    <CustomWidthBoxCell size="m" typo={true} style={{ padding: '0 5px', justifyContent: 'flex-start !important' }}>
      <Button
        startIcon={isFetching ? <CircularProgress size={20} /> : <DownloadIcon />}
        sx={DownloaderClass}
        onClick={handleClick}
        disabled={isFetching}
      >
        <Typography
          variant="body2"
          align="left"
          textOverflow={'ellipsis'}
          overflow={'hidden'}
          whiteSpace={'nowrap'}
          width={'calc(100%)'}
        >
          {fileName}
        </Typography>
      </Button>
    </CustomWidthBoxCell>
  );
};
