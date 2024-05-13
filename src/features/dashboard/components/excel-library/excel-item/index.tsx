'use client';

import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { FoundationLibrary } from '@/features/dashboard/types/foundation-library.type';
import excelIcon from '@/shared/assets/images/xls_32.png';

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
    <Tooltip title={item.FileName}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        sx={{
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          cursor: 'pointer',
          p: 1,
          '&:hover': {
            transform: 'scale(1.05)',
          },
          transition: 'transform 0.1s linear',
        }}
        onClick={handleClick}
      >
        <Image src={excelIcon} width={'32'} height={'32'} alt={item.FileName} />
        <Typography
          variant="caption"
          sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '100%', overflowX: 'hidden' }}
        >
          {fileName}
        </Typography>
      </Stack>
    </Tooltip>
  );
};

export default ExcelItem;
