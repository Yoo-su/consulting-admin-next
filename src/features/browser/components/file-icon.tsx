'use client';

import { animated, useSpring } from '@react-spring/web';
import Image from 'next/image';
import { memo } from 'react';

import DocIcon from '@/shared/assets/svgs/doc.svg';
import ExcelIcon from '@/shared/assets/svgs/excel.svg';
import ExeIcon from '@/shared/assets/svgs/exe.svg';
import DirectoryIcon from '@/shared/assets/svgs/folder.svg';
import ImageIcon from '@/shared/assets/svgs/image.svg';
import PdfIcon from '@/shared/assets/svgs/pdf.svg';
import PptIcon from '@/shared/assets/svgs/ppt.svg';
import TxtIcon from '@/shared/assets/svgs/txt.svg';
import UnknownIcon from '@/shared/assets/svgs/unknown.svg';

type FileIconProps = {
  contentType: string;
};

export const FileIcon = memo(({ contentType }: FileIconProps) => {
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
      case 'application/octet-stream':
        return ExeIcon;
      case 'directory':
        return DirectoryIcon;
      default:
        return UnknownIcon;
    }
  };

  const icon = getIcon();

  return (
    <animated.div style={fadeIn}>
      <Image
        draggable={false}
        src={icon}
        alt="file icon"
        width={48}
        height={48}
      />
    </animated.div>
  );
});
FileIcon.displayName = 'FileIcon';
