import { memo } from 'react';
import Image from 'next/image';

import PdfIcon from '@/shared/assets/svgs/pdf.svg';
import TxtIcon from '@/shared/assets/svgs/txt.svg';
import ExcelIcon from '@/shared/assets/svgs/excel.svg';
import UnknownIcon from '@/shared/assets/svgs/unknown.svg';
import ImageIcon from '@/shared/assets/svgs/image.svg';

type FileIconProps = {
  extension: string;
};
const FileIcon = ({ extension }: FileIconProps) => {
  const getIcon = () => {
    switch (extension) {
      case 'xls':
        return ExcelIcon;
      case 'xlsx':
        return ExcelIcon;
      case 'pdf':
        return PdfIcon;
      case 'txt':
        return TxtIcon;
      case 'png':
        return ImageIcon;
      case 'jpg':
        return ImageIcon;
      default:
        return UnknownIcon;
    }
  };

  const icon = getIcon();

  return <Image src={icon} alt={'folder'} width={48} height={48} objectFit={'contain'} />;
};

export default memo(FileIcon);
