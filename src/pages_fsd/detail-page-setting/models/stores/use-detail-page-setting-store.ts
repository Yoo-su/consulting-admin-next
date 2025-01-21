import { create } from 'zustand';

import { DetailPageData } from '../types';

type DetailPageSettignState = {
  selectedRowNumber: number | null;
  copiedDetailPageDatas: DetailPageData[];

  setSelectedRowNumber: (rowNumber: number | null) => void;
  setCopiedDetailPageDatas: (detailPageDatas: DetailPageData[]) => void;
};
export const useDetailPageSettingStore = create<DetailPageSettignState>(
  (set) => ({
    selectedRowNumber: null,
    copiedDetailPageDatas: [],

    setSelectedRowNumber: (rowNumber) => set({ selectedRowNumber: rowNumber }),
    setCopiedDetailPageDatas: (detailPageDatas) =>
      set({ copiedDetailPageDatas: detailPageDatas }),
  })
);
