import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import FolderIcon from '@/shared/assets/svgs/folder.svg';
import { BrowserItem } from '@/shared/models';

type BrowserFolderProps = {
  browserItem: BrowserItem;
  handleClickFolder: (folder: BrowserItem) => void;
};
const BrowserFolder = ({ browserItem, handleClickFolder }: BrowserFolderProps) => {
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
        handleClickFolder(browserItem);
      }}
    >
      <Image src={FolderIcon} alt={'folder'} width={48} height={48} objectFit={'contain'} />
      <Typography variant={'caption'}>{browserItem.name}</Typography>
    </Stack>
  );
};

export default BrowserFolder;
