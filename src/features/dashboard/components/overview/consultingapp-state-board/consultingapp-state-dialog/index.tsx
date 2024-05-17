'use client';

import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EggIcon from '@mui/icons-material/Egg';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CloseIcon from '@mui/icons-material/Close';
import SpokeIcon from '@mui/icons-material/Spoke';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';

import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';

const ConsultingAppStateDialog = () => {
  const { dialogType, isDialogOpen, closeDialog, dialogContentState } = useConsultingAppState();
  if (!dialogContentState) return null;

  const { bgcolor, color, title } = stateBoardDomainItems[dialogContentState.currentState];

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display={'flex'} justifyContent={'flex-end'} width={'100%'}>
          <IconButton size="small" onClick={closeDialog}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack direction={'column'} spacing={3} px={6}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1} flexGrow={1}>
              <AccountBalanceIcon fontSize="small" />
              <Typography variant="body1">대학교</Typography>
            </Stack>
            <Typography variant="body2">{dialogContentState.univName}</Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1} flexGrow={1}>
              <EggIcon fontSize="small" />
              <Typography variant="body1">서비스ID</Typography>
            </Stack>
            <Typography variant="body2">{dialogContentState.serviceID}</Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1} flexGrow={1}>
              <SpokeIcon fontSize="small" />
              <Typography variant="body1">현재 상태</Typography>
            </Stack>
            <Chip size="small" label={title} sx={{ bgcolor: color }} />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1} flexGrow={1}>
              <AccessibilityIcon fontSize="small" />
              <Typography variant="body1">담당 개발자</Typography>
            </Stack>
            <Typography variant="body2">{dialogContentState.developer}</Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1} flexGrow={1}>
              <EmojiPeopleIcon fontSize="small" />
              <Typography variant="body1">담당 운영자</Typography>
            </Stack>
            <Typography variant="body2">{dialogContentState.manager}</Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1} flexGrow={1}>
              <SportsMartialArtsIcon fontSize="small" />
              <Typography variant="body1">담당 영업자</Typography>
            </Stack>
            <Typography variant="body2">{dialogContentState.salesPerson ?? '미정'}</Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1} flexGrow={1}>
              <FiberNewIcon fontSize="small" />
              <Typography variant="body1">신규앱 여부</Typography>
            </Stack>
            <Checkbox size="small" checked={dialogContentState.isNew ?? false} readOnly />
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultingAppStateDialog;
