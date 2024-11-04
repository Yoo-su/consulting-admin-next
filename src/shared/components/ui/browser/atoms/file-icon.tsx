import { memo } from 'react';
import Image from 'next/image';

import PdfIcon from '@/shared/assets/svgs/pdf.svg';
import TxtIcon from '@/shared/assets/svgs/txt.svg';
import ExcelIcon from '@/shared/assets/svgs/excel.svg';
import UnknownIcon from '@/shared/assets/svgs/unknown.svg';
import ImageIcon from '@/shared/assets/svgs/image.svg';
import PptIcon from '@/shared/assets/svgs/ppt.svg';
import DocIcon from '@/shared/assets/svgs/doc.svg';

type FileIconProps = {
  contentType: string;
};
const FileIcon = ({ contentType }: FileIconProps) => {
  const getIcon = () => {
    switch (contentType) {
      case 'application/vnd.ms-excel':
        return ExcelIcon;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return ExcelIcon;
      case 'application/pdf':
        return PdfIcon;
      case 'text/plain':
        return TxtIcon;
      case 'image/png':
        return ImageIcon;
      case 'image/jpeg':
        return ImageIcon;
      case 'application/msword':
        return DocIcon;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return DocIcon;
      case 'application/vnd.ms-powerpoint':
        return PptIcon;
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return PptIcon;
      default:
        return UnknownIcon;
    }
  };

  const icon = getIcon();

  return <Image src={icon} alt={'folder'} width={48} height={48} />;
};

export default memo(FileIcon);
