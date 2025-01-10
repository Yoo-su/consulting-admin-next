'use client';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack, Typography } from '@mui/material';
import { memo, useCallback } from 'react';

import { ButtonIcon } from '@/shared/components';
import { useConfirmToast } from '@/shared/hooks';

import { useCreateCalcConfigMutation } from '../../hooks';

type HeaderProps = {
  serviceID: string;
};
export const Header = ({ serviceID }: HeaderProps) => {
  const { mutateAsync } = useCreateCalcConfigMutation();
  const { openConfirmToast } = useConfirmToast();

  const handleClickAddBtn = useCallback(
    () =>
      openConfirmToast({
        message: '새로운 Config를 추가하시겠습니까?',
        callbackConfirm: async () => await mutateAsync(serviceID),
      }),
    [serviceID]
  );

  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <Stack direction={'row'} flexGrow={1} alignItems={'center'} gap={0.5}>
        <SettingsIcon />
        <Typography variant={'h4'}>Config 설정</Typography>
      </Stack>

      <ButtonIcon
        Icon={AddCircleOutlineIcon}
        onClick={handleClickAddBtn}
        size={'large'}
      />
    </Stack>
  );
};
