'use client';

import ProfileIcon from '@mui/icons-material/AccountBox';
import SignoutIcon from '@mui/icons-material/ExitToApp';
import { Box, Divider, ListItemIcon, MenuItem, MenuList, Popover, Stack, Typography } from '@mui/material';
import RouterLink from 'next/link';
import DotLoader from 'react-spinners/DotLoader';

import { useUser } from '@/shared/hooks';

export type UserPopoverProps = {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
};

export const UserPopover = ({ anchorEl, onClose, open }: UserPopoverProps) => {
  const { user, setUser } = useUser();

  const handleClickSignoutBtn = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      {user ? (
        <>
          <Box sx={{ p: '16px 20px ' }}>
            <Typography variant="body1" fontSize={20}>
              {user?.userName} | {user?.departmentID === 2 ? '개발자' : '운영자'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              사용자ID: {user?.sub}
            </Typography>
          </Box>
          <Divider />
          <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
            <MenuItem component={RouterLink} href="/dashboard/account-setting">
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClickSignoutBtn}>
              <ListItemIcon>
                <SignoutIcon />
              </ListItemIcon>
              Sign out
            </MenuItem>
          </MenuList>
        </>
      ) : (
        <Stack
          direction={'column'}
          spacing={2}
          sx={{
            display: 'flex',
            p: '18px 20px ',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DotLoader color={'rgba(0,0,0,0.4'} size={50} />
          <Typography variant="body2">로그아웃중...</Typography>
        </Stack>
      )}
    </Popover>
  );
};
