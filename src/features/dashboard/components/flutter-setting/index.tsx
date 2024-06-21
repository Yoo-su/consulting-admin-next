'use client';

import { Grid, Stack } from '@mui/material';
import SettingList from './setting-list';
import SettingDetail from './setting-detail';
import { useGetFlutterSettingQuery } from '../../hooks/tanstack/use-get-flutter-setting-query';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import { useEffect, useState } from 'react';
import { useUnivService } from '../../hooks/context/use-univ-service';
import { getFilteredCustomConfig } from '../../services/flutter-setting/get-filtered-custom-config';
import { FlutterSetting as FlutterSettingType } from '../../types/flutter-setting.type';

const FlutterSetting = () => {
  const { currentService } = useUnivService();
  const { flutterSettingList, setFlutterSettingList, filteredSettingList, setFilteredSettingList } =
    useFlutterSetting();
  const { data: settingList } = useGetFlutterSettingQuery({ serviceID: currentService!.serviceID });

  const [toggle, setToggle] = useState(false);
  const [filteredList, setFilteredList] = useState<FlutterSettingType[]>(flutterSettingList);
  useEffect(() => {
    console.log('refetched');
    setFlutterSettingList(settingList ?? []);
    setFilteredSettingList(getFilteredCustomConfig(settingList ?? []));
  }, [settingList]);

  useEffect(() => {
    console.log('toggle', toggle);
    if (toggle) {
      setFilteredList(filteredSettingList);
    } else {
      setFilteredList(flutterSettingList);
    }
  }, [toggle, filteredSettingList, flutterSettingList]);

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
          <SettingDetail filteredList={filteredList} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default FlutterSetting;
