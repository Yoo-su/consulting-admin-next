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
  const path = subCategory ? [index, 'children', settingList.Index ?? 0] : [index] ?? [];

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
<<<<<<< HEAD
  list: FlutterSetting | FlutterRowInfo | (FlutterSetting | FlutterRowInfo)[],
=======
  list: FlutterSetting | FlutterSetting[] | FlutterRowInfo | FlutterRowInfo[],
>>>>>>> f60146b0b6c734a79ee93c17a7a5a5c367aeb84f
  category: string
) => {
  const filteredList = Array.isArray(list)
    ? list
        ?.map((item: any, index: number) => {
<<<<<<< HEAD
          // path를 위한 index 추가
          item.Index = index;
          return item;
        })
        .filter((item: any) => {
          // 대분류와 소분류에 따라 필터링
=======
          const newItem = JSON.parse(JSON.stringify(item));
          newItem.Index = index;
          return newItem;
        })
        .filter((item: any) => {
>>>>>>> f60146b0b6c734a79ee93c17a7a5a5c367aeb84f
          if (item.Title) {
            return item.Title === category;
          } else {
            return item.Category === category;
          }
        })[0] ?? null
    : list;
  const description = filteredList?.Description;
  const children = filteredList?.children ?? filteredList;
<<<<<<< HEAD
  const index = filteredList?.Index;
  return { filteredList, description, children, index };
=======
  return { filteredList, description, children, index: filteredList?.Index };
>>>>>>> f60146b0b6c734a79ee93c17a7a5a5c367aeb84f
};
