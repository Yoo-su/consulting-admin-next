import { memo } from 'react';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';

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
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 170, friction: 12, duration: 200 },
  });

  const getIcon = () => {
    switch (contentType) {
      case 'application/vnd.ms-excel':
        return ExcelIcon;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return ExcelIcon;
      case 'application/haansoftxls':
        return ExcelIcon;
      case 'application/pdf':
        return PdfIcon;
      case 'text/plain':
        return TxtIcon;
      case 'image/png':
      case 'image/jpeg':
        return ImageIcon;
      case 'application/msword':
        return DocIcon;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return DocIcon;
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return PptIcon;
      default:
        return UnknownIcon;
    }
  };

  const icon = getIcon();

  return (
    <animated.div style={fadeIn}>
      <Image src={icon} alt="file icon" width={48} height={48} />
    </animated.div>
  );
};

export default memo(FileIcon);
