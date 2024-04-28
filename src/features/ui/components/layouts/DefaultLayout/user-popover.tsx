'use client';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ProfileIcon from '@mui/icons-material/AccountBox';
import SignoutIcon from '@mui/icons-material/ExitToApp';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

const UserPopover = ({ anchorEl, onClose, open }: UserPopoverProps) => {
  const router = useRouter();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant='subtitle1'>yoosu</Typography>
        <Typography color='text.secondary' variant='body2'>
          suhyun0871@jinhakapply.com
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}
      >
        <MenuItem component={RouterLink} href='/' onClick={onClose}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SignoutIcon />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default UserPopover;
