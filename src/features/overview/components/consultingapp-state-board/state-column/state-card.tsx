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
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { Draggable } from '@hello-pangea/dnd';
import { useTransition, useSpring, animated, a } from '@react-spring/web';
import toast from 'react-hot-toast';

import { ConsultingAppState, useStatusBoardStore } from '@/features/overview/models';
import { useUnivService } from '@/shared/hooks/context';

export type StateCardProps = {
  state: ConsultingAppState;
  index: number;
};

const StateCard = ({ state, index }: StateCardProps) => {
  const { univList, serviceList, setCurrentService, setCurrentUniv, isServiceListLoading } = useUnivService();
  const { toggleDialog, setDialogContentState } = useStatusBoardStore();
  const [isHover, setIsHover] = useState(false);
  const [isSelectBtnClicked, setIsSelectBtnClicked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentUniv = univList.filter((univ) => univ.univID == state.univID)[0];
  const univName = currentUniv?.univName || '새대학';
  const serviceID = state.serviceID ? state.serviceID : `${state.univID}-미정`;

  const handleIconClick = () => {
    setDialogContentState({ ...state, univName, serviceID });
    toggleDialog(true);
  };

  const handleCardClick = () => {
    setCurrentUniv(currentUniv);
    setCurrentService(null);
    setIsSelectBtnClicked(true);
  };

  useEffect(() => {
    if (isSelectBtnClicked && !isServiceListLoading) {
      const currentService = serviceList.find((service) => service.serviceID == state.serviceID) ?? null;
      if (currentService) {
        setCurrentService(currentService);
        toast.success(<Typography variant="body2">서비스가 선택되었습니다</Typography>);
      } else {
        toast.error(<Typography variant="body2">서비스가 존재하지 않습니다</Typography>);
      }
      setIsSelectBtnClicked(false);
    }
  }, [isServiceListLoading, isSelectBtnClicked]);

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
      {(provided, snapshot) => (
        <Box
          component="div"
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
              <Stack direction={'row'} alignItems={'center'}>
                {getAppIcon(state.isNew || false)}
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                  {serviceID}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                {univName}
              </Typography>
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

            <animated.div style={snapshot.isDragging ? undefined : hoverAnimation}>
              <Box ref={contentRef}>
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
                    {isServiceListLoading ? (
                      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={1}>
                        <Typography variant="caption" sx={{ paddingTop: '1px', color: 'rgba(0,0,0,0.8)' }}>
                          선택중
                        </Typography>
                        <CircularProgress color="inherit" size={12} />
                      </Stack>
                    ) : (
                      <>
                        <Typography variant="caption" sx={{ paddingTop: '1px' }}>
                          서비스 선택
                        </Typography>
                        <CheckIcon />
                      </>
                    )}
                  </Stack>
                </Stack>
              </Box>
            </animated.div>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default memo(StateCard);

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

const getAppIcon = (isNew: boolean) => {
  if (isNew) {
    return (
      <Tooltip title={'플러터앱'} placement="top">
        <Image
          src="../flutter.svg"
          alt="flutter-logo"
          width={15}
          height={15}
          style={{ paddingBottom: '1px', paddingRight: '2px' }}
        />
      </Tooltip>
    );
  }
  return (
    <Tooltip title={'PWA앱'} placement="top">
      <Image src="../pwa.svg" alt="pwa-logo" width={20} height={20} style={{ padding: '0 2px 1px 2px' }} />
    </Tooltip>
  );
};
