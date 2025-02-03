'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { useSharedStore } from '@/shared/models';

import { useDetailPageSettingStore } from '../models';
import { getNewDetailPageData, getNewRowNumber } from '../utils';
import { useDetailPageSettingMutation, useGetDetailPageDataQuery } from './tanstack';

export const useDetailPageContainer = () => {
  const currentUniv = useSharedStore((state) => state.currentUniv);
  const currentService = useSharedStore((state) => state.currentService);
  const univName = currentUniv?.univName ?? '';
  const serviceID = currentService?.serviceID ?? '';
  const copiedDetailPageDatas = useDetailPageSettingStore((state) => state.copiedDetailPageDatas);
  const setSelectedData = useDetailPageSettingStore((state) => state.setSelectedRowNumber);
  const setCopiedDetailPageDatas = useDetailPageSettingStore((state) => state.setCopiedDetailPageDatas);
  const { postDetailPageData, isPostDetailPageDataLoading, isPostDetailPageDataSuccess, setDetailPageData } =
    useDetailPageSettingMutation();
  const {
    data: detailPageDatas,
    isLoading: isDetailPageDataLoading,
    isSuccess: isDetailPageDataSuccess,
    refetch,
  } = useGetDetailPageDataQuery(serviceID);

  const containerTitle = `${univName}(${serviceID}) 상세페이지 설정`;

  // 변경사항 유무
  const hasChanges = useMemo(() => {
    const sortedOriginalData = [...copiedDetailPageDatas].sort((a, b) => a.rowNum - b.rowNum),
      sortedChartData = [...(detailPageDatas ?? [])].sort((a, b) => a.rowNum - b.rowNum);
    return JSON.stringify(sortedOriginalData) !== JSON.stringify(sortedChartData);
  }, [detailPageDatas, copiedDetailPageDatas, currentService]);

  // 새로운 데이터 행 추가
  const handleAddNewData = useCallback(() => {
    const newRowNumber = getNewRowNumber(detailPageDatas ?? []);
    const newDetailPageRow = getNewDetailPageData(serviceID, newRowNumber);
    setDetailPageData([...(detailPageDatas ?? []), newDetailPageRow]);
  }, [currentService, detailPageDatas]);

  // 변경내용 저장 버튼 클릭처리
  const handleSaveChanges = useCallback(() => {
    postDetailPageData(detailPageDatas ?? []);
  }, [detailPageDatas]);

  /**
   * 언마운트 시
   * 변경사항을 무시하고 서비스 아이디를 변경하는 경우를 대비해 refetch,
   * 선택된 데이터 초기화
   */
  useEffect(() => {
    return () => {
      refetch();
      setSelectedData(null);
    };
  }, [currentService]);

  useEffect(() => {
    setCopiedDetailPageDatas([...(detailPageDatas ?? [])]);
  }, [isDetailPageDataSuccess, isPostDetailPageDataSuccess, currentService]);

  return {
    hasChanges,
    containerTitle,
    isDetailPageDataLoading,
    isPostDetailPageDataLoading,
    detailPageDatas,
    handleSaveChanges,
    handleAddNewData,
  };
};
