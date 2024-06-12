import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';

import { mockData } from '../mock-data';
import { Stack, Typography } from '@mui/material';
import EditSetting from '../edit-setting';
const SettingDetail = () => {
  const { selectedCategory } = useFlutterSetting();
  const [category, subCategory] = selectedCategory.split('/');

  const settingList = subCategory ? mockData[category][subCategory] : mockData[category];

  return (
    <Stack spacing={2} sx={{ minWidth: '100%' }}>
      <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
        {category}
      </Typography>
      {subCategory && (
        <Typography variant={'body1'} sx={{ fontWeight: 'bold' }}>
          {subCategory}
        </Typography>
      )}
      <EditSetting settingList={settingList} />
    </Stack>
  );
};

export default SettingDetail;
