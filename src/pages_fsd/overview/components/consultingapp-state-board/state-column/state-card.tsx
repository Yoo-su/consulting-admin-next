'use client';

import { Draggable } from '@hello-pangea/dnd';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { animated, useSpring } from '@react-spring/web';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';

import {
  CURRENT_SERVICE_MESSAGE,
  IconDetailClass,
  IconToGoClass,
  StateCardClass,
  StateCardNameClass,
} from '@/pages_fsd/overview/constants';
import {
  ConsultingAppState,
  useStatusBoardStore,
} from '@/pages_fsd/overview/models';
import {
  useGetServiceListQuery,
  useGetUnivListQuery,
  useTypographyToast,
} from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

type StateCardProps = {
  state: ConsultingAppState;
  index: number;
};
export const StateCard = memo(({ state, index }: StateCardProps) => {
  const { showError, showSuccess } = useTypographyToast();
  const { currentUniv, setCurrentService, setCurrentUniv } = useSharedStore();
  const { data: univList } = useGetUnivListQuery();
  const { data: serviceList, isLoading: isServiceListLoading } =
    useGetServiceListQuery(currentUniv?.univID);
  const { toggleDialog, setDialogContentState } = useStatusBoardStore();
  const [isHover, setIsHover] = useState(false);
  const [isSelectBtnClicked, setIsSelectBtnClicked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const cardUniv = univList.filter((univ) => univ.univID == state.univID)[0];
  const univName = cardUniv?.univName || '새대학';
  const serviceID = state.serviceID ? state.serviceID : `${state.univID}-미정`;

  const handleIconClick = () => {
    setDialogContentState({ ...state, univName, serviceID });
    toggleDialog(true);
  };

  const handleCardClick = () => {
    setCurrentUniv(cardUniv);
    setCurrentService(null);
    setIsSelectBtnClicked(true);
  };

  useEffect(() => {
    if (isSelectBtnClicked && !isServiceListLoading) {
      const currentService =
        serviceList?.find((service) => service.serviceID == state.serviceID) ??
        null;
      if (currentService) {
        setCurrentService(currentService);
        showSuccess(CURRENT_SERVICE_MESSAGE.SELECTED);
      } else {
        showError(CURRENT_SERVICE_MESSAGE.NOT_SELECTED);
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
    <Draggable
      key={`${state.currentState}${index}`}
      draggableId={`${state.currentState}${index}`}
      index={index}
    >
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          sx={StateCardClass}
        >
          <Tooltip title="자세히" placement="top">
            <IconButton
              sx={IconDetailClass}
              onClick={handleIconClick}
              disableRipple
            >
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
              <Box sx={StateCardNameClass}>
                <Typography variant="caption">{state.developerName}</Typography>
              </Box>
              {state.managerName && (
                <Box sx={StateCardNameClass}>
                  <Typography variant="caption">{state.managerName}</Typography>
                </Box>
              )}
            </Stack>

            <animated.div
              style={snapshot.isDragging ? undefined : hoverAnimation}
            >
              <Box ref={contentRef}>
                <Stack direction={'column'} spacing={1}>
                  <Divider />
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    spacing={1}
                    sx={IconToGoClass}
                    onClick={handleCardClick}
                  >
                    {isServiceListLoading ? (
                      <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        spacing={1}
                      >
                        <Typography
                          variant="caption"
                          sx={{ paddingTop: '1px', color: 'rgba(0,0,0,0.8)' }}
                        >
                          선택중
                        </Typography>
                        <CircularProgress color="inherit" size={12} />
                      </Stack>
                    ) : (
                      <>
                        <Typography
                          variant="caption"
                          sx={{ paddingTop: '1px' }}
                        >
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
});
StateCard.displayName = 'StateCard';

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
      <Image
        src="../pwa.svg"
        alt="pwa-logo"
        width={20}
        height={20}
        style={{ padding: '0 2px 1px 2px' }}
      />
    </Tooltip>
  );
};
