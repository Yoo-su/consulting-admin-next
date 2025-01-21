import { DetailPageData } from '../models';

export const getNewRowNumber = (detailPageData: DetailPageData[]) => {
  const rowNumbers = detailPageData.map((item) => item.rowNum);
  const newRowNum: number = detailPageData?.length
    ? Math.max(...rowNumbers) + 1
    : 1;
  return newRowNum;
};
