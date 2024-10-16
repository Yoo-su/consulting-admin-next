'use client';

import { useEffect, useState, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EggIcon from '@mui/icons-material/Egg';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CloseIcon from '@mui/icons-material/Close';
import SpokeIcon from '@mui/icons-material/Spoke';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

import { useConsultingAppState } from '../../hooks';
import { STATE_BOARD_DOMAIN_ITEMS } from '../../constants';
import { StateBoardDomainItems } from '../../models';

const ConsultingAppStateDialog = () => {
  const { dialogType, isDialogOpen, closeDialog, dialogContentState } = useConsultingAppState();
  if (!dialogContentState) return null;

  const { bgcolor, color, title } =
    STATE_BOARD_DOMAIN_ITEMS[dialogContentState.currentState as keyof StateBoardDomainItems];

  const StackContainer = ({ children, typo }: { children: ReactNode; typo?: string }) => {
    return (
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
        {children}
        {typo && <Typography variant="body2">{typo}</Typography>}
      </Stack>
    );
  };

  const StackLabelContainer = ({ children, label }: { children: ReactNode; label: string }) => {
    return (
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1}
        flexGrow={1}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 'small' } }}
      >
        {children}
        <Typography variant="body1">{label}</Typography>
      </Stack>
    );
  };

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
        <Stack direction={'column'} spacing={3} px={6} sx={{ paddingBottom: '1rem' }}>
          <StackContainer typo={dialogContentState.univName}>
            <StackLabelContainer label="대학교">
              <AccountBalanceIcon />
            </StackLabelContainer>
          </StackContainer>

          <StackContainer typo={dialogContentState.serviceID}>
            <StackLabelContainer label="서비스ID">
              <EggIcon />
            </StackLabelContainer>
          </StackContainer>

          <StackContainer>
            <StackLabelContainer label="현재 상태">
              <SpokeIcon />
            </StackLabelContainer>
            <Chip size="small" label={title} sx={{ bgcolor: color }} />
          </StackContainer>

          <StackContainer typo={dialogContentState.developerName}>
            <StackLabelContainer label="담당 개발자">
              <AccessibilityIcon />
            </StackLabelContainer>
          </StackContainer>

          <StackContainer typo={dialogContentState.managerName ?? '미정'}>
            <StackLabelContainer label="담당 운영자">
              <EmojiPeopleIcon />
            </StackLabelContainer>
          </StackContainer>

          <StackContainer typo={dialogContentState.salesPersonName ?? '미정'}>
            <StackLabelContainer label="담당 영업자">
              <SportsMartialArtsIcon />
            </StackLabelContainer>
          </StackContainer>

          <StackContainer>
            <StackLabelContainer label="신규앱 여부">
              <FiberNewIcon />
            </StackLabelContainer>
            {dialogContentState.isNew ? (
              <CheckIcon sx={{ color: '#1976D2' }} />
            ) : (
              <CloseIcon sx={{ color: '#FD5361' }} />
            )}
          </StackContainer>

          <StackContainer typo={dialogContentState.serialKey ?? '미정'}>
            <StackLabelContainer label="시리얼넘버">
              <VpnKeyRoundedIcon />
            </StackLabelContainer>
          </StackContainer>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultingAppStateDialog;
