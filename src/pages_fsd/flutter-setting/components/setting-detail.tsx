import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import { useFlutterSetting } from '../hooks';
import { FlutterRowInfo, FlutterSetting } from '../models';
import { EditSetting } from './edit-setting';

type SettingDetailProps = {
  filteredList: FlutterSetting[];
  isDisabled: boolean;
};
export const SettingDetail = ({
  filteredList: filteredSettingList,
  isDisabled,
}: SettingDetailProps) => {
  const { selectedCategory } = useFlutterSetting();
  const [category, subCategory, subSubCategory] = selectedCategory.split('/');

  const { index, description, children } = getCategoryInfo(
    filteredSettingList,
    category
  );
  const { filteredList } = getCategoryInfo(children, subCategory);
  const { filteredList: grandFilteredList } = subSubCategory
    ? getCategoryInfo(filteredList?.children, subSubCategory)
    : { filteredList: null };

  const settingList = useMemo(
    () =>
      subSubCategory
        ? grandFilteredList
        : subCategory
        ? filteredList
        : children,
    [subCategory, subSubCategory]
  );

  const path = subCategory
    ? [index, 'children', settingList?.Index ?? 0]
    : [index];

  return (
    <Stack
      spacing={2}
      sx={{
        minWidth: '100%',
        height: '73vh',
        overflowY: 'auto',
        paddingBottom: '1rem',
      }}
    >
      <Stack>
        {filteredSettingList.length > 0 && (
          <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
            {category}
          </Typography>
        )}
        {description && (
          <Typography variant={'overline'}>{description}</Typography>
        )}
      </Stack>
      <EditSetting
        settingList={settingList}
        path={path}
        isDisabled={isDisabled}
      />
      {/* {category && <AddSetting category={category} />} */}
    </Stack>
  );
};

const getCategoryInfo = (
  list: FlutterSetting | FlutterRowInfo | (FlutterSetting | FlutterRowInfo)[],
  category: string
) => {
  const filteredList = Array.isArray(list)
    ? list // path를 위한 Index 추가
        ?.map((item: any, index: number) => ({ ...item, Index: index }))
        // 대분류와 소분류에 따라 필터링
        .filter((item: any) =>
          item.Title ? item.Title === category : item.Category === category
        )[0] ?? null
    : list;
  const description = filteredList?.Description;
  const children = filteredList?.children ?? filteredList;
  const index = filteredList?.Index;
  return { filteredList, description, children, index };
};
