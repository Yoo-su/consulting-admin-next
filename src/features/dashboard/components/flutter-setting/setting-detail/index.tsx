import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';

import { Stack, Typography } from '@mui/material';
import EditSetting from '../edit-setting';
import { FlutterRowInfo, FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';
import AddSetting from '../add-setting';

type SettingDetailProps = {
  filteredList: FlutterSetting[];
  isDisabled: boolean;
};
const SettingDetail = ({ filteredList: filteredSettingList, isDisabled }: SettingDetailProps) => {
  const { selectedCategory } = useFlutterSetting();
  const [category, subCategory] = selectedCategory.split('/');

  const { index, description, children } = getCategoryInfo(filteredSettingList, category);
  const { filteredList } = getCategoryInfo(children, subCategory);

  const settingList = subCategory ? filteredList : children;
  const path = subCategory ? [index, 'children', settingList?.Index ?? 0] : [index] ?? [];

  return (
    <Stack spacing={2} sx={{ minWidth: '100%', paddingBottom: '1rem' }}>
      <Stack>
        <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
          {category}
        </Typography>
        {description && <Typography variant={'overline'}>{description}</Typography>}
      </Stack>
      <EditSetting settingList={settingList} path={path} isDisabled={isDisabled} />
      {/* {category && <AddSetting category={category} />} */}
    </Stack>
  );
};

export default SettingDetail;

const getCategoryInfo = (
  list: FlutterSetting | FlutterRowInfo | (FlutterSetting | FlutterRowInfo)[],
  category: string
) => {
  const filteredList = Array.isArray(list)
    ? list // path를 위한 Index 추가
        ?.map((item: any, index: number) => ({ ...item, Index: index }))
        // 대분류와 소분류에 따라 필터링
        .filter((item: any) => (item.Title ? item.Title === category : item.Category === category))[0] ?? null
    : list;
  const description = filteredList?.Description;
  const children = filteredList?.children ?? filteredList;
  const index = filteredList?.Index;
  return { filteredList, description, children, index };
};
