'use client';

import { ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { Service } from '@/shared/models';
import { getCurrentServiceYear } from '@/shared/services';

import { ButtonValues, unselectedIconFilter } from '../../constants';
import { useUpdateServiceIsNewMutation } from '../../hooks';

type SetAppTypeProps = {
  service: Service;
};
export const SetAppType = ({ service }: SetAppTypeProps) => {
  const { mutateAsync } = useUpdateServiceIsNewMutation();
  const [isNew, setIsNew] = useState(service.isNew || false);

  const currentServiceYear = getCurrentServiceYear();
  const isCurrent = currentServiceYear.toString() == service?.schoolYear || false;

  const handleIsNew = (event: MouseEvent<HTMLSpanElement>, value: boolean) => {
    if (value === null) return;
    setIsNew(value);
    toast.promise(mutateAsync({ serviceID: parseInt(service.serviceID), isNew: value }), {
      loading: <Typography variant="body2">앱 타입을 변경하는 중입니다...</Typography>,
      success: <Typography variant="body2">앱 타입 변경 완료!</Typography>,
      error: () => {
        setIsNew(!value);
        return <Typography variant="body2">앱 타입 변경 중 문제가 발생했습니다</Typography>;
      },
    });
  };

  return (
    <ToggleButtonGroup
      value={isNew}
      exclusive
      onChange={isCurrent ? handleIsNew : () => {}}
      size="small"
      sx={ToggleButtonGroupClass(isCurrent)}
    >
      {ButtonValues.map((button, index) => (
        <Tooltip key={index} title={<Typography variant="caption">{button.title}</Typography>} placement="top">
          <ToggleButton value={button.value} id={service.serviceID} sx={ToggleButtonClass(!button.value, isNew)}>
            <Image
              src={button.image.src}
              alt={button.image.alt}
              width={button.image.width}
              height={button.image.height}
            />
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
};

const ToggleButtonGroupClass = (isCurrent: boolean) => ({
  '& .Mui-selected': {
    backgroundColor: 'transparent !important',
  },
  '& .MuiToggleButtonGroup-grouped': {
    cursor: isCurrent ? 'pointer' : 'not-allowed',
    border: '0px solid white',
  },
});

const ToggleButtonClass = (isPWA: boolean, isNew: boolean) => ({
  padding: isPWA ? '5px 0' : '9.5px 0',
  filter: isPWA === isNew ? unselectedIconFilter : '',
});
