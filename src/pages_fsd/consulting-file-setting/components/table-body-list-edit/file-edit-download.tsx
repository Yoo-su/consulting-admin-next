'use client';

import DownloadIcon from '@mui/icons-material/Download';
import { Button, CircularProgress, Typography } from '@mui/material';

import { DownloaderClass, FILE_MESSAGE } from '@/pages_fsd/consulting-file-setting/constants';
import { useGetConsultingFileDownloadQuery } from '@/pages_fsd/consulting-file-setting/hooks';
import { getFileType } from '@/pages_fsd/consulting-file-setting/services';
import { useTypographyToast } from '@/shared/hooks';

import { CellBoxCustomWidth } from '../table-customs/';

type FileEditDownloadProps = {
  fileName: string;
};
export const FileEditDownload = ({ fileName }: FileEditDownloadProps) => {
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
    <CellBoxCustomWidth size="m" typo={true} style={{ padding: '0 5px', justifyContent: 'flex-start !important' }}>
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
    </CellBoxCustomWidth>
  );
};
