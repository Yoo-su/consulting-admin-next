'use client';

import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { FoundationLibrary } from '@/features/dashboard/types/foundation-library.type';
import excelIcon from '@/shared/assets/images/xls_64.png';
import { formatKoreanTextCompareDatesFromNow } from '@/shared/services/get-formatted-date';

type ExcelItemProps = {
  item: FoundationLibrary;
};
const ExcelItem = ({ item }: ExcelItemProps) => {
  const {
    ServiceID: serviceID,
    FileName: fileName,
    UploadDate: uploadDate,
    ModifyUser: modifyUser,
    url: downloadUrl,
  } = item;

  const handleClick = async () => {
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      // 파일 다운로드 트리거
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
    }
  };

  return (
    <Tooltip title={<Typography>{fileName}</Typography>}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        sx={{
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          p: 1,
          '&:hover': {
            transform: 'scale(1.05)',
            bgcolor: 'rgba(0,0,0,0.1)',
          },
          transition: 'all 0.1s linear',
        }}
        onClick={handleClick}
      >
        <Image src={excelIcon} width={'32'} height={'32'} alt={fileName} />
        <Stack direction={'column'} sx={{ overflow: 'hidden', justifyContent: 'space-between', flexGrow: 1 }}>
          <Typography variant="caption" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {fileName}
          </Typography>

          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant="caption" color="grey.500" textAlign="right">
              편집자: {modifyUser}
            </Typography>
            <Typography variant="caption" color="grey.500" textAlign="right">
              {formatKoreanTextCompareDatesFromNow(uploadDate)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Tooltip>
  );
};

export default ExcelItem;
