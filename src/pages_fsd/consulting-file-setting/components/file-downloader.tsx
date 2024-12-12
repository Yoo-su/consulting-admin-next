'use client';

import DownloadIcon from '@mui/icons-material/Download';
import { Button, CircularProgress, Typography } from '@mui/material';
import toast from 'react-hot-toast';

import { useGetConsultingFileDownloadQuery } from '../hooks';
import { CustomWidthBoxCell } from './table-components';

type FileDownloaderProps = {
  fileName: string;
};
export const FileDownloader = ({ fileName }: FileDownloaderProps) => {
  const { refetch, isFetching } = useGetConsultingFileDownloadQuery(fileName);

  const handleClick = async () => {
    try {
      const { data: fileContent } = await refetch();
      if (!fileContent) {
        throw new Error('DownloadFailed: Invalid or empty file received');
      }
      const blob = new Blob([fileContent], { type: 'application/pdf' });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`
      );
      document.body.appendChild(link);
      link.click();

      // Clean up
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error(error);
      toast.error(
        <Typography variant="body2">
          파일 다운로드 중 문제가 발생했습니다
        </Typography>
      );
    }
  };

  return (
    <CustomWidthBoxCell
      size="m"
      typo={true}
      style={{ padding: '0 5px', justifyContent: 'flex-start !important' }}
    >
      <Button
        startIcon={
          isFetching ? <CircularProgress size={20} /> : <DownloadIcon />
        }
        sx={{
          minWidth: '350px',
          '& .MuiButton-icon': {
            margin: 0,
            paddingRight: '2px',
            paddingTop: '2px',
          },
        }}
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
