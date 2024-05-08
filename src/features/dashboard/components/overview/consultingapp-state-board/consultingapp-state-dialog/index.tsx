'use client';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import CloseIcon from '@mui/icons-material/Close';
import SpokeIcon from '@mui/icons-material/Spoke';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';

const ConsultingAppStateDialog = () => {
  const { dialogType, isDialogOpen, closeDialog } = useConsultingAppState();
  return (
    <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display={'flex'} justifyContent={'flex-end'} width={'100%'}>
          <IconButton size="small" onClick={closeDialog}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack direction={'column'} spacing={2.5}>
          <Stack direction={'row'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <SpokeIcon fontSize="small" />
              <Typography variant="caption">현재 상태</Typography>
            </Stack>
            <TextField variant="standard" size="small" />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={20}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <SelfImprovementIcon fontSize="small" />
              <Typography variant="caption">담당 개발자</Typography>
            </Stack>
            <TextField variant="standard" size="small" />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={20}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <SpokeIcon fontSize="small" />
              <Typography variant="caption">현재 상태</Typography>
            </Stack>
            <TextField variant="standard" size="small" />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={20}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <SpokeIcon fontSize="small" />
              <Typography variant="caption">현재 상태</Typography>
            </Stack>
            <TextField variant="standard" size="small" />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={20}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <SpokeIcon fontSize="small" />
              <Typography variant="caption">현재 상태</Typography>
            </Stack>
            <TextField variant="standard" size="small" />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={20}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <SpokeIcon fontSize="small" />
              <Typography variant="caption">현재 상태</Typography>
            </Stack>
            <TextField variant="standard" size="small" />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={20}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <SpokeIcon fontSize="small" />
              <Typography variant="caption">현재 상태</Typography>
            </Stack>
            <TextField variant="standard" size="small" />
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultingAppStateDialog;
