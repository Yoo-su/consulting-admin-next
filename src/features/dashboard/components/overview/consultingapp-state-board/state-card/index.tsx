'use client';

import { memo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { Draggable } from 'react-beautiful-dnd';

import { useConsultingAppState } from '@/features/dashboard/hooks/context/use-consultingapp-state';
import { ConsultingAppState } from '@/features/dashboard/types/consultingapp-state.type';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import toast from 'react-hot-toast';

export type StateCardProps = {
  state: ConsultingAppState;
  index: number;
  developer?: string;
};
const StateCard = ({ state, index }: StateCardProps) => {
  const { univList, serviceList, setCurrentService, setCurrentUniv } = useUnivService();
  const { openDialog, setDialogContentState } = useConsultingAppState();
  const [isHover, setIsHover] = useState(false);

  const currentUniv = univList.filter((univ) => univ.univID == state.univID)[0];
  const currentService = serviceList.filter((service) => service.serviceID == state.serviceID)[0] || null;
  const serviceInfo = state.serviceYear + (state.serviceType === 'S_A' ? '수시' : '정시');
  const univName = currentUniv?.univName || '새대학';
  const serviceID = state.serviceID ? state.serviceID : `${state.univID}-미정`;

  const handleIconClick = () => {
    setDialogContentState({ ...state, univName, serviceID });
    openDialog('modify');
  };

  const handleCardClick = () => {
    setCurrentUniv(currentUniv);
    setCurrentService(currentService);
    if (!currentService) {
      toast.error('서비스가 존재하지 않습니다.');
    }
  };

  const iconDetailStyle = {
    fontSize: '.5rem',
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '.3rem .2rem',
    cursor: 'pointer',
    '& .MuiSvgIcon-root': {
      fontSize: '1rem',
    },
    '&:hover': {
      color: 'black',
    },
  };
  const iconToGoStyle = {
    cursor: 'pointer',
    margin: 0,
    py: 0.5,
    borderRadius: '.2rem',
    '& .MuiSvgIcon-root': {
      fontSize: '.9rem',
    },
    '&:hover': {
      backgroundColor: '#EBFADB',
    },
    transition: 'all 0.1s ease-in-out',
  };
  return (
    <Draggable key={`${state.currentState}${index}`} draggableId={`${state.currentState}${index}`} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          sx={{
            p: 1,
            cursor: 'pointer',
            bgcolor: '#fff',
            borderRadius: '.3rem',
            borderColor: 'transparent',
            '&:hover': {
              border: '2px solid rgba(0,0,0,0.2)',
            },
            position: 'relative',
            transition: 'border-color 0.3s ease-in-out',
          }}
        >
          <Tooltip title="자세히" placement="top">
            <IconButton sx={{ ...iconDetailStyle }} onClick={handleIconClick} disableRipple>
              <MoreVertSharpIcon />
            </IconButton>
          </Tooltip>
          <Stack direction={'column'} spacing={1}>
            <Stack direction={'column'}>
              <Typography variant="caption">{serviceInfo}</Typography>
              <Typography variant="body2">{univName}</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Box sx={{ bgcolor: '#f3f4f6', borderRadius: '5px', padding: 0.5, width: 'fit-content' }}>
                <Typography variant="caption">{state.developerName}</Typography>
              </Box>
              {state.managerName && (
                <Box sx={{ bgcolor: '#f3f4f6', borderRadius: '5px', padding: 0.5, width: 'fit-content' }}>
                  <Typography variant="caption">{state.managerName}</Typography>
                </Box>
              )}
            </Stack>

            <Stack
              direction={'column'}
              spacing={1}
              sx={{
                display: isHover || snapshot.isDragging ? 'block' : 'none',
                ...((isHover || snapshot.isDragging ? 'block' : 'none') && {
                  animation: 'fadein 0.3s ease-in-out',
                }),
              }}
            >
              <Divider sx={{ display: isHover || snapshot.isDragging ? 'block' : 'none' }} />
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                spacing={1}
                sx={{
                  ...iconToGoStyle,
                  display: isHover || snapshot.isDragging ? 'flex' : 'none',
                }}
                onClick={handleCardClick}
              >
                <Typography variant="caption" sx={{ paddingTop: '1px' }}>
                  서비스 선택
                </Typography>
                <CheckIcon />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default memo(StateCard);
