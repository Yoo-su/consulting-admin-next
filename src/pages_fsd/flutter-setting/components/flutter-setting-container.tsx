'use client';

import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { SaveDataButton } from '@/shared/components';
import { useInterceptAppRouter } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { ContainerClass } from '../constants/classes';
import { useFlutterSetting, useGetFlutterSettingsInfoQuery, useNavigationBlock } from '../hooks';
import { FlutterSetting as FlutterSettingType } from '../models';
import { getFilteredCustomConfig } from '../services';
import { SettingDetail } from './detail-panel';
import { SettingList } from './list-panel';

export const FlutterSettingContainer = () => {
  const currentService = useSharedStore((state) => state.currentService);
  const {
    flutterSettingList,
    setFlutterSettingList,
    filteredSettingList,
    setFilteredSettingList,
    editedSettingList,
    resetEditedSettingList,
    updateSettingList,
  } = useFlutterSetting();
  const { data: settingList } = useGetFlutterSettingsInfoQuery({
    serviceID: currentService!.serviceID,
  });

  const [toggle, setToggle] = useState(false);
  const [filteredList, setFilteredList] = useState<FlutterSettingType[]>(flutterSettingList);

  //#region navigation block
  const [isBlocked, setIsBlocked] = useState(false);

  // 변경된 데이터가 있으면 페이지 이동을 막는다.
  useEffect(() => {
    setIsBlocked(editedSettingList.length > 0);
  }, [editedSettingList]);
  // TODO:  대학/서비스 아이디 변경 시에도 막는 거 구현하기

  // 브라우저 뒤로가기 버튼 + 이동하기 막기
  const handleViewTransition = useNavigationBlock({ isBlocked });

  // useInterceptAppRouter('back', handleViewTransition);
  // useInterceptAppRouter('forward', handleViewTransition);
  useInterceptAppRouter('prefetch', handleViewTransition);
  useInterceptAppRouter('push', handleViewTransition);
  useInterceptAppRouter('refresh', handleViewTransition);
  useInterceptAppRouter('replace', handleViewTransition);
  //#endregion navigation block

  useEffect(() => {
    setFlutterSettingList(settingList ?? []);
    setFilteredSettingList(getFilteredCustomConfig(settingList ?? []));
    resetEditedSettingList();
  }, [settingList]);

  useEffect(() => {
    setFilteredList(toggle ? filteredSettingList : flutterSettingList);
  }, [toggle, filteredSettingList, flutterSettingList]);

  const handleBtnClick = () => {
    updateSettingList();
  };

  return (
    <Stack direction={'column'} sx={ContainerClass}>
      <Grid container sx={{ minHeight: '500px' }}>
        <Grid item xs={4} sx={{ paddingRight: '.8rem' }}>
          <SettingList toggle={toggle} setToggle={setToggle} filteredList={filteredList} />
        </Grid>
        <Grid item xs={8} sx={{ borderLeft: '1px solid #FAFAFA', paddingLeft: '1rem' }}>
          <SettingDetail filteredList={filteredList} isDisabled={toggle} />
          {editedSettingList.length > 0 && <SaveDataButton handleBtnClick={handleBtnClick} />}
        </Grid>
      </Grid>
    </Stack>
  );
};
