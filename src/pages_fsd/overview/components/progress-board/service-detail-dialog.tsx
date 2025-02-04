'use client';

import {
  Accessibility as AccessibilityIcon,
  AccountBalance as AccountBalanceIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Egg as EggIcon,
  EmojiPeople as EmojiPeopleIcon,
  FiberNew as FiberNewIcon,
  Spoke as SpokeIcon,
  SportsMartialArts as SportsMartialArtsIcon,
  VpnKeyRounded as VpnKeyRoundedIcon,
} from '@mui/icons-material';
import { Box, Chip, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { PROGRESS_STATE_ITEMS } from '../../constants';
import { ProgressStateColumns, useBoardStore } from '../../models';

export const ServiceDetailDialog = () => {
  const { isDialogOpen, toggleDialog, dialogContent } = useBoardStore();
  if (!dialogContent) return null;

  const { bgcolor, color, title } = PROGRESS_STATE_ITEMS[dialogContent.currentState as keyof ProgressStateColumns];

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
    <Dialog open={isDialogOpen} onClose={() => toggleDialog(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display={'flex'} justifyContent={'flex-end'} width={'100%'}>
          <IconButton size="small" onClick={() => toggleDialog(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack direction={'column'} spacing={3} px={6} sx={{ paddingBottom: '1rem' }}>
          <StackContainer typo={dialogContent.univName}>
            <StackLabelContainer label="대학교">
              <AccountBalanceIcon />
            </StackLabelContainer>
          </StackContainer>

          <StackContainer typo={dialogContent.serviceID}>
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

          <StackContainer typo={dialogContent.developerName}>
            <StackLabelContainer label="담당 개발자">
              <AccessibilityIcon />
            </StackLabelContainer>
          </StackContainer>

          <StackContainer typo={dialogContent.managerName ?? '미정'}>
            <StackLabelContainer label="담당 운영자">
              <EmojiPeopleIcon />
            </StackLabelContainer>
          </StackContainer>

          <StackContainer typo={dialogContent.salesPersonName ?? '미정'}>
            <StackLabelContainer label="담당 영업자">
              <SportsMartialArtsIcon />
            </StackLabelContainer>
          </StackContainer>

          <StackContainer>
            <StackLabelContainer label="신규앱 여부">
              <FiberNewIcon />
            </StackLabelContainer>
            {dialogContent.isNew ? <CheckIcon sx={{ color: '#1976D2' }} /> : <CloseIcon sx={{ color: '#FD5361' }} />}
          </StackContainer>

          <StackContainer typo={dialogContent.serialKey ?? '미정'}>
            <StackLabelContainer label="시리얼넘버">
              <VpnKeyRoundedIcon />
            </StackLabelContainer>
          </StackContainer>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
