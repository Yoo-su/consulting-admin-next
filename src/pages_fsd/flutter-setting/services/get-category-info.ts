import { GetCategoryInfoList } from '../models';

export const getCategoryInfo = (
  list: GetCategoryInfoList,
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
