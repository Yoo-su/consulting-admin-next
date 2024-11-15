import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { memo } from 'react';

import FolderIcon from '@/shared/assets/svgs/folder.svg';
import { BrowserItem } from '@/shared/models';

type BrowserDirectoryProps = {
  browserItem: BrowserItem;
  handleClickDirectory: (Directory: BrowserItem) => void;
};
const BrowserDirectory = ({
  browserItem,
  handleClickDirectory,
}: BrowserDirectoryProps) => {
  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      gap={0.3}
      sx={{
        borderRadius: '0.3rem',
        padding: '0.2rem',
        transition: 'all 0.1s ease-in-out',
        ':hover': {
          bgcolor: '#EBECEE',
        },
      }}
      onDoubleClick={() => {
        handleClickDirectory(browserItem);
      }}
    >
      <Image src={FolderIcon} alt={'folder'} width={48} height={48} />
      <Typography variant={'caption'} width={'64px'} textAlign={'center'}>
        {browserItem.name}
      </Typography>
    </Stack>
  );
};

export default memo(BrowserDirectory);
