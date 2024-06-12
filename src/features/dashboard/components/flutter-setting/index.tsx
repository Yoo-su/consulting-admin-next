'use client';

import { Grid, Stack } from '@mui/material';
import SettingList from './setting-list';
import SettingDetail from './setting-detail';

const FlutterSetting = () => {
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
        <Grid item xs={3} sx={{ paddingRight: '.8rem' }}>
          <SettingList />
        </Grid>
        <Grid item xs={9} sx={{ borderLeft: '1px solid #FAFAFA', paddingLeft: '1rem' }}>
          <SettingDetail />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default FlutterSetting;
