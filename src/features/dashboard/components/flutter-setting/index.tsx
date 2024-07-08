'use client';

import { Grid, Stack } from '@mui/material';
import SettingList from './setting-list';
import SettingDetail from './setting-detail';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { getFilteredCustomConfig } from '@/features/dashboard/services/flutter-setting/get-filtered-custom-config';
import { FlutterSetting as FlutterSettingType } from '@/features/dashboard/types/flutter-setting.type';
import SaveDataButton from '@/shared/components/save-data-button';
import { useGetFlutterSettingsInfoQuery } from '../../hooks/tanstack/use-get-flutter-settings-info-query';
import { useGetFlutterSettingQuery } from '../../hooks/tanstack/use-get-flutter-setting-query';
import useInterceptAppRouter from '@/shared/hooks/use-intercept-app-router';
import { useConfirmToast } from '@/shared/hooks/use-confirm-toast';

const FlutterSetting = () => {
  const { currentService } = useUnivService();
  const {
    flutterSettingList,
    setFlutterSettingList,
    filteredSettingList,
    setFilteredSettingList,
    editedSettingList,
    resetEditedSettingList,
    updateSettingList,
  } = useFlutterSetting();
  // const { data: settingList } = useGetFlutterSettingsInfoQuery({ serviceID: currentService!.serviceID });

  const { data: settingList } = useGetFlutterSettingQuery({ serviceID: currentService!.serviceID });

  const [toggle, setToggle] = useState(false);
  const [filteredList, setFilteredList] = useState<FlutterSettingType[]>(flutterSettingList);

  const editedListRef = useRef(editedSettingList);
  const { openConfirmToast } = useConfirmToast();
  const handleViewTransition = useCallback((originalMethod: () => void) => {
    if (editedListRef.current.length > 0) {
      openConfirmToast('저장되지 않은 데이터가 있습니다.\n이동하시겠습니까?', originalMethod);
    } else {
      originalMethod();
    }
  }, []);
  useEffect(() => {
    editedListRef.current = editedSettingList;
  }, [editedSettingList]);

  useInterceptAppRouter('back', handleViewTransition);
  useInterceptAppRouter('forward', handleViewTransition);
  useInterceptAppRouter('prefetch', handleViewTransition);
  useInterceptAppRouter('push', handleViewTransition);
  useInterceptAppRouter('refresh', handleViewTransition);
  useInterceptAppRouter('replace', handleViewTransition);

  useEffect(() => {
    console.log('refetched');
    setFlutterSettingList(settingList ?? []);
    setFilteredSettingList(getFilteredCustomConfig(settingList ?? []));
    resetEditedSettingList();
  }, [settingList]);

  useEffect(() => {
    if (toggle) {
      setFilteredList(filteredSettingList);
    } else {
      setFilteredList(flutterSettingList);
    }
  }, [toggle, filteredSettingList, flutterSettingList]);

  const handleBtnClick = () => {
    updateSettingList();
  };

  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        p: 2,
      }}
    >
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

export default FlutterSetting;
