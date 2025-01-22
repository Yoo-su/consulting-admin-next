import { Stack } from '@mui/material';
import { DetailClass } from '../../constants';
import { useFlutterSetting } from '../../hooks';
import { FlutterSetting } from '../../models';
import { getCategoryInfo } from '../../services';
import { DetailTitle } from './detail-title';
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

  const settingList = subSubCategory
    ? grandFilteredList
    : subCategory
    ? filteredList
    : children;

  const path = subCategory
    ? [index, 'children', settingList?.Index ?? 0]
    : [index];

  return (
    <Stack spacing={2} sx={DetailClass}>
      <DetailTitle
        isTitle={filteredSettingList.length > 0}
        category={category}
        description={description}
      />
      <EditSetting
        settingList={settingList}
        path={path}
        isDisabled={isDisabled}
      />
      {/* {category && <AddSetting category={category} />} */}
    </Stack>
  );
};
