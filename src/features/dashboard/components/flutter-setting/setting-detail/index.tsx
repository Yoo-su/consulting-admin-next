import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';

import { Stack, Typography } from '@mui/material';
import EditSetting from '../edit-setting';
import { FlutterRowInfo, FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';
import AddSetting from '../add-setting';

const getCategoryInfo = (
  list: FlutterSetting | FlutterSetting[] | FlutterRowInfo | FlutterRowInfo[],
  category: string
) => {
  const filteredList = Array.isArray(list)
    ? list?.filter((item: any) => {
        if (item.Title) return item.Title === category;
        else return item.Category === category;
      })[0] ?? null
    : list;
  const description = filteredList?.Description;
  const children = filteredList?.children ?? filteredList;
  return { filteredList, description, children };
};

type SettingDetailProps = { filteredList: FlutterSetting[]; toggle: boolean };
const SettingDetail = ({ filteredList: filteredSettingList, toggle }: SettingDetailProps) => {
  const { selectedCategory } = useFlutterSetting();
  const [category, subCategory] = selectedCategory.split('/');

  const { description, children } = getCategoryInfo(filteredSettingList, category);
  const { filteredList } = getCategoryInfo(children, subCategory);

  const settingList = subCategory ? filteredList : children;

  return (
    <Stack spacing={2} sx={{ minWidth: '100%', paddingBottom: '1rem' }}>
      <Stack>
        <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
          {category}
        </Typography>
        {description && <Typography variant={'overline'}>{description}</Typography>}
      </Stack>
      <EditSetting settingList={settingList} isEdit={!toggle} />
      {/* {category && <AddSetting category={category} />} */}
    </Stack>
  );
};

export default SettingDetail;
