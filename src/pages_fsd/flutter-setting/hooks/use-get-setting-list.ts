import { FlutterSetting } from '../models';
import { getCategoryInfo } from '../services/get-category-info';
import { useFlutterSetting } from './use-flutter-setting';

export const useGetSettingList = (filteredSettingList: FlutterSetting[]) => {
  const { selectedCategory } = useFlutterSetting();
  const [category, subCategory, subSubCategory] = selectedCategory.split('/');

  const { index, description, children } = getCategoryInfo(
    filteredSettingList,
    category
  );
  const { filteredList } = getCategoryInfo(children, subCategory);

  let list;
  if (subSubCategory) {
    const { filteredList: grandFilteredList } = getCategoryInfo(
      filteredList?.children,
      subSubCategory
    );
    list = grandFilteredList;
  } else if (subCategory) {
    list = filteredList;
  } else {
    list = children;
  }

  const path = subCategory ? [index, 'children', list?.Index ?? 0] : [index];

  return { category, description, settingList: list, path };
};
