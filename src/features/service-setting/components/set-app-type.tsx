'use client';

import {
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import toast from 'react-hot-toast';

import { Service } from '@/shared/models';
import { getCurrentServiceYear } from '@/shared/services';

import { useUpdateServiceIsNewMutation } from '../hooks';

type SetAppTypeProps = {
  isNew: boolean[];
  index: number;
  setIsNew: Dispatch<SetStateAction<boolean[]>>;
  service: Service;
};
const SetAppType = ({ isNew, index, setIsNew, service }: SetAppTypeProps) => {
  const { mutateAsync } = useUpdateServiceIsNewMutation();

  const currentServiceYear = getCurrentServiceYear();
  const isCurrent =
    currentServiceYear.toString() == service?.schoolYear || false;

  const makeNewList = (id: number, value: boolean) => {
    setIsNew((prev) => {
      const newIsNew = [...prev];
      newIsNew[id] = value;
      return newIsNew;
    });
  };

  const handleIsNew = (event: MouseEvent<HTMLSpanElement>, value: boolean) => {
    if (value === null) return;
    const id = parseInt(event.currentTarget.id);
    makeNewList(id, value);
    toast.promise(
      mutateAsync({ serviceID: parseInt(service.serviceID), isNew: value }),
      {
        loading: (
          <Typography variant="body2">
            앱 타입을 변경하는 중입니다...
          </Typography>
        ),
        success: <Typography variant="body2">앱 타입 변경 완료!</Typography>,
        error: () => {
          makeNewList(id, !value);
          return (
            <Typography variant="body2">
              앱 타입 변경 중 문제가 발생했습니다
            </Typography>
          );
        },
      }
    );
  };

  return (
    <ToggleButtonGroup
      value={isNew[index]}
      exclusive
      onChange={isCurrent ? handleIsNew : () => {}}
      size="small"
      sx={{
        ...ToggleButtonGroupClass,
        '& .MuiToggleButtonGroup-grouped': {
          cursor: isCurrent ? 'pointer' : 'not-allowed',
          border: '0px solid white',
        },
      }}
    >
      <Tooltip
        title={<Typography variant="caption">PWA(기존)</Typography>}
        placement="top"
      >
        <ToggleButton
          value={false}
          id={index.toString()}
          sx={{
            padding: '5px 0',
            filter: isNew[index] ? unselectedIconFilter : '',
          }}
        >
          <Image src="../pwa.svg" alt="pwa" width={40} height={25} />
        </ToggleButton>
      </Tooltip>
      <Tooltip
        title={<Typography variant="caption">플러터(신규)</Typography>}
        placement="top"
      >
        <ToggleButton
          value={true}
          id={index.toString()}
          sx={{
            padding: '9.5px 0',
            filter: isNew[index] ? '' : unselectedIconFilter,
          }}
        >
          <Image src="../flutter.svg" alt="flutter" width={40} height={15} />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};

export default SetAppType;

const ToggleButtonGroupClass = {
  '& .Mui-selected': {
    backgroundColor: 'transparent !important',
  },
};
const unselectedIconFilter = 'grayscale(1) opacity(.5)';
