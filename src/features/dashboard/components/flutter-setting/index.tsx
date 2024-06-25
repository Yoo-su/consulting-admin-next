'use client';

import { Grid, Stack, Typography } from '@mui/material';
import SettingList from './setting-list';
import SettingDetail from './setting-detail';
import { useGetFlutterSettingQuery } from '../../hooks/tanstack/use-get-flutter-setting-query';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import { useEffect, useState } from 'react';
import { useUnivService } from '../../hooks/context/use-univ-service';
import { getFilteredCustomConfig } from '../../services/flutter-setting/get-filtered-custom-config';
import { FlutterSetting as FlutterSettingType } from '../../types/flutter-setting.type';
import SaveChangedDataButton from '../../../../shared/components/save-changed-data-button';
import { useConfirmToast } from '@/shared/hooks/use-confirm-toast';

const FlutterSetting = () => {
  const { currentService } = useUnivService();
  const {
    flutterSettingList,
    setFlutterSettingList,
    filteredSettingList,
    setFilteredSettingList,
    editedSettingList,
    updateSettingList,
    resetSettingList,
  } = useFlutterSetting();
  const { data: settingList } = useGetFlutterSettingQuery({ serviceID: currentService!.serviceID });
  const { openConfirmToast } = useConfirmToast();

  const [toggle, setToggle] = useState(false);
  const [isException, setIsException] = useState(!toggle);
  const [filteredList, setFilteredList] = useState<FlutterSettingType[]>(flutterSettingList);

  const handleBtnClick = () => {
    updateSettingList();
  };

  useEffect(() => {
    console.log('refetched');
    setFlutterSettingList(settingList ?? []);
    setFilteredSettingList(getFilteredCustomConfig(settingList ?? []));
  }, [settingList]);

  useEffect(() => {
    if (isException) {
      if (editedSettingList.length > 0) {
        openConfirmToast(
          '변경사항이 존재합니다. 변경사항을 저장하시겠습니까?',
          () => {
            handleBtnClick();
            setFilteredList(filteredSettingList);
            setToggle(isException);
          },
          () => {
            resetSettingList();
            setFilteredList(filteredSettingList);
            setToggle(isException);
          }
        );
      } else {
        setFilteredList(filteredSettingList);
        setToggle(isException);
      }
    } else {
      setFilteredList(flutterSettingList);
      setToggle(isException);
    }
  }, [isException, filteredSettingList, flutterSettingList]);

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
          <SettingList toggle={toggle} setIsException={setIsException} filteredList={filteredList} />
        </Grid>
        <Grid item xs={8} sx={{ borderLeft: '1px solid #FAFAFA', paddingLeft: '1rem' }}>
          <SettingDetail filteredList={filteredList} toggle={toggle} />
          {editedSettingList.length > 0 && <SaveChangedDataButton handleBtnClick={handleBtnClick} />}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default FlutterSetting;
