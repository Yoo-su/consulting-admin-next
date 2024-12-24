'use client';

import { Grid, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { SaveDataButton } from '@/shared/components';
import { useInterceptAppRouter } from '@/shared/hooks';
import { useConfirmToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { useFlutterSetting, useGetFlutterSettingsInfoQuery } from '../hooks';
import { FlutterSetting as FlutterSettingType } from '../models';
import { getFilteredCustomConfig } from '../services';
import { SettingDetail } from './setting-detail';
import { SettingList } from './setting-list';

export const FlutterSettingContainer = () => {
  const { currentService } = useSharedStore();
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
  const [filteredList, setFilteredList] =
    useState<FlutterSettingType[]>(flutterSettingList);

  //#region navigation block
  const { openConfirmToast } = useConfirmToast();
  const [isBlocked, setIsBlocked] = useState(false);
  const router = useRouter();

  // 변경된 데이터가 있으면 페이지 이동을 막는다.
  useEffect(() => {
    setIsBlocked(editedSettingList.length > 0);
  }, [editedSettingList]);
  // 브라우저 뒤로가기 버튼 막기
  useEffect(() => {
    if (isBlocked) {
      window.history.pushState(null, '', window.location.href); // preventing forward button
      const listener = () => {
        openConfirmToast(
          '저장되지 않은 데이터가 있습니다.\n이동하시겠습니까?',
          () => router.back(),
          () => window.history.pushState(null, '', window.location.href)
        );
      };

      window.addEventListener('popstate', listener);
      return () => {
        window.removeEventListener('popstate', listener);
      };
    }
  }, [isBlocked]);

  // 페이지 이동 막기
  const handleViewTransition = useCallback(
    (originalMethod: () => void) => {
      if (isBlocked) {
        openConfirmToast(
          '저장되지 않은 데이터가 있습니다.\n이동하시겠습니까?',
          originalMethod
        );
      } else {
        originalMethod();
      }
    },
    [isBlocked]
  );

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
        boxShadow:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        p: 2,
      }}
    >
      <Grid container sx={{ minHeight: '500px' }}>
        <Grid item xs={4} sx={{ paddingRight: '.8rem' }}>
          <SettingList
            toggle={toggle}
            setToggle={setToggle}
            filteredList={filteredList}
          />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ borderLeft: '1px solid #FAFAFA', paddingLeft: '1rem' }}
        >
          <SettingDetail filteredList={filteredList} isDisabled={toggle} />
          {editedSettingList.length > 0 && (
            <SaveDataButton handleBtnClick={handleBtnClick} />
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};
