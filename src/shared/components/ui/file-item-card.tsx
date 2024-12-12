'use client';

import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Image, { StaticImageData } from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

export type FileType =
  | 'excel'
  | 'apk'
  | 'exe'
  | 'jpg'
  | 'png'
  | 'ppt'
  | 'word'
  | 'pdf'
  | 'txt'
  | 'none';

export const iconPathMap: {
  [key in FileType]: () => Promise<{ default: StaticImageData }>;
} = {
  excel: () => import('@/shared/assets/images/xls_64.png'),
  apk: () => import('@/shared/assets/images/apk_64.png'),
  exe: () => import('@/shared/assets/images/exe_64.png'),
  jpg: () => import('@/shared/assets/images/jpg_64.png'),
  png: () => import('@/shared/assets/images/png_64.png'),
  ppt: () => import('@/shared/assets/images/ppt_64.png'),
  word: () => import('@/shared/assets/images/word_64.png'),
  pdf: () => import('@/shared/assets/images/pdf_64.png'),
  txt: () => import('@/shared/assets/images/txt_64.png'),
  none: () => import('@/shared/assets/images/none_64.png'),
};

type IconBoxProps = {
  file: FileType;
};

const IconBox = ({ file }: IconBoxProps) => {
  const [iconSrc, setIconSrc] = useState<StaticImageData | null>(null);

  useEffect(() => {
    try {
      iconPathMap[file]().then((module) => setIconSrc(module.default));
    } catch (err) {
      iconPathMap['none']().then((module) => setIconSrc(module.default));
    }
  }, [file]);

  return (
    iconSrc && <Image src={iconSrc} width={'32'} height={'32'} alt={file} />
  );
};

type ContentBoxProps = {
  children: ReactNode;
};

const ContentBox = ({ children }: ContentBoxProps) => {
  return (
    <Stack
      direction={'column'}
      sx={{ overflow: 'hidden', justifyContent: 'space-between', flexGrow: 1 }}
    >
      {children}
    </Stack>
  );
};

type TitleBoxProps = {
  title: string;
};

const TitleBox = ({ title }: TitleBoxProps) => {
  return (
    <Typography
      variant="caption"
      sx={{
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {title}
    </Typography>
  );
};

type AdditionalInfoProps = {
  children: ReactNode;
  sxProps?: SxProps;
};

const AdditionalInfo = ({ children, sxProps }: AdditionalInfoProps) => {
  return (
    <Stack direction={'row'} sx={{ ...sxProps }}>
      {children}
    </Stack>
  );
};

type FileItemCardProps = {
  children: ReactNode;
  tooltipMsg?: string;
  handleClick?: () => void;
  sxProps?: SxProps;
};

export const FileItemCard = ({
  children,
  tooltipMsg,
  handleClick,
  sxProps,
}: FileItemCardProps) => {
  return (
    <Tooltip
      disableHoverListener={!tooltipMsg}
      title={<Typography variant="caption">{tooltipMsg}</Typography>}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={2}
        sx={{
          boxShadow:
            '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          p: 1,
          '&:hover': {
            transform: 'scale(1.05)',
            bgcolor: 'rgba(0,0,0,0.1)',
          },
          transition: 'all 0.1s linear',
          ...sxProps,
        }}
        onClick={handleClick}
      >
        {children}
      </Stack>
    </Tooltip>
  );
};

FileItemCard.IconBox = IconBox;
FileItemCard.ContentBox = ContentBox;
FileItemCard.TitleBox = TitleBox;
FileItemCard.AdditionalInfo = AdditionalInfo;
