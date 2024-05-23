'use client';

import { useState, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import PersonIcon from '@mui/icons-material/Person';

import AppSideDrawer from './app-side-drawer';
import UserPopover from './user-popover';
import { usePopover } from '../../hooks/use-popover';

const AppHeader = () => {
  const [openAppSideDrawer, setOpenAppSideDrawer] = useState<boolean>(false);
  const userPopover = usePopover<HTMLDivElement>();
  const theme = useTheme();
  const uplg = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if (uplg) setOpenAppSideDrawer(false);
  }, [uplg]);

  return (
    <Fragment>
      <Box
        component="header"
        sx={{
          bgcolor: '#fafafa',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--AppHeader-zIndex)',
          boxShadow: ' 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '64px',
            px: 2,
          }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenAppSideDrawer(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <Avatar
            onClick={userPopover.handleOpen}
            ref={userPopover.anchorRef}
            sx={{ cursor: 'pointer', bgcolor: '#2C4059' }}
          >
            <PersonIcon />
          </Avatar>
        </Stack>
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <AppSideDrawer
        open={openAppSideDrawer}
        onClose={() => {
          setOpenAppSideDrawer(false);
        }}
      />
    </Fragment>
  );
};

export default AppHeader;
