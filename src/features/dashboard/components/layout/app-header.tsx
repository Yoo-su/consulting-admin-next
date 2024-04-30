'use client';

import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

import UserPopover from './user-popover';
import { usePopover } from '../../hooks/use-popover';

const AppHeader = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const userPopover = usePopover<HTMLDivElement>();
  return (
    <Fragment>
      <Box
        component='header'
        sx={{
          bgcolor: '#FAFBFC',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--AppHeader-zIndex)',
          boxShadow:
            ' 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
      >
        <Stack
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '64px',
            px: 2,
          }}
        >
          <Stack sx={{ alignItems: 'center' }} direction='row' spacing={2}>
            <Tooltip title='sidenav'>
              <IconButton
                onClick={(): void => {
                  setOpenNav(true);
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Avatar
            onClick={userPopover.handleOpen}
            ref={userPopover.anchorRef}
            src=''
            sx={{ cursor: 'pointer' }}
          />
        </Stack>
      </Box>
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />
    </Fragment>
  );
};

export default AppHeader;
