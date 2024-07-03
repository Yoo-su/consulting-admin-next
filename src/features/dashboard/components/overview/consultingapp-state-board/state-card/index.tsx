'use client';

import { memo, useEffect, useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { Draggable } from 'react-beautiful-dnd';
import { useTransition, useSpring, animated } from '@react-spring/web';

import { useConsultingAppState } from '@/features/dashboard/hooks/context/use-consultingapp-state';
import { ConsultingAppState } from '@/features/dashboard/types/consultingapp-state.type';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import toast from 'react-hot-toast';
import { useGetServiceList } from '@/features/dashboard/hooks/use-get-service-list';

export type StateCardProps = {
  state: ConsultingAppState;
  index: number;
  developer?: string;
};

const StateCard = ({ state, index }: StateCardProps) => {
  const { univList, serviceList, setCurrentService, setCurrentUniv } = useUnivService();
  const { openDialog, setDialogContentState } = useConsultingAppState();
  const [isHover, setIsHover] = useState(false);
  const [isServiceSelected, setIsServiceSelected] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { execute: getServiceList, isLoading } = useGetServiceList();

  const currentUniv = univList.filter((univ) => univ.univID == state.univID)[0];
  const univName = currentUniv?.univName || '새대학';
  const serviceID = state.serviceID ? state.serviceID : `${state.univID}-미정`;

  const handleIconClick = () => {
    setDialogContentState({ ...state, univName, serviceID });
    openDialog('modify');
  };

  const handleCardClick = () => {
    setCurrentUniv(currentUniv);
    getServiceList(currentUniv.univID);
    setIsServiceSelected(true);
  };

  useEffect(() => {
    if (isServiceSelected && !isLoading) {
      const currentService = serviceList.find((service) => service.serviceID == state.serviceID) ?? null;
      setCurrentService(currentService);
      if (currentService) {
        toast.success('서비스가 선택되었습니다');
      } else {
        toast.error('서비스가 존재하지 않습니다');
      }
      setIsServiceSelected(false);
    }
  }, [isLoading]);

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

  const delay = index * 100; // 각 카드의 애니메이션 지연 시간 설정

  // 등장 애니메이션 설정
  const transitions = useTransition(state, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    delay,
  });

  // Hover 애니메이션 효과 추가
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isHover]);

  const hoverAnimation = useSpring({
    height: isHover ? contentHeight : 0,
    opacity: isHover ? 1 : 0,
    overflow: 'hidden',
    config: { duration: 200, easing: (t) => t * (2 - t) },
  });

  return (
    <Draggable key={`${state.currentState}${index}`} draggableId={`${state.currentState}${index}`} index={index}>
      {(provided, snapshot) =>
        transitions((style, item) => (
          <animated.div style={style}>
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
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {serviceID}
                  </Typography>
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

                <animated.div style={hoverAnimation}>
                  <div ref={contentRef}>
                    <Stack direction={'column'} spacing={1}>
                      <Divider />
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        spacing={1}
                        sx={iconToGoStyle}
                        onClick={handleCardClick}
                      >
                        <Typography variant="caption" sx={{ paddingTop: '1px' }}>
                          서비스 선택
                        </Typography>
                        <CheckIcon />
                      </Stack>
                    </Stack>
                  </div>
                </animated.div>
              </Stack>
            </Box>
          </animated.div>
        ))
      }
    </Draggable>
  );
};

export default memo(StateCard);
