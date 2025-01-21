'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useSharedStore } from '@/shared/models';

import { ChartData, useChartSettingStore } from '../models';
import {
  getDistinctColumnValues,
  getNewChartData,
  getNewNumberColumnValue,
} from '../utils';
import { useChartDataMutation, useGetChartDataQuery } from './tanstack';

type UseChartSettingContainerReturn = {
  containerTitle: string;
  chartDatas: ChartData[] | undefined;
  isChartDataExist: boolean;
  isChartDataLoading: boolean;
  modelNumbers: number[];
  hasChanges: boolean;
  handleSaveChanges: () => void;
  handleAddNewModel: () => void;
};
export const useChartSettingContainer = () => {
  const _return = useRef<UseChartSettingContainerReturn>();
  const currentUniv = useSharedStore((state) => state.currentUniv);
  const currentService = useSharedStore((state) => state.currentService);
  const univName = currentUniv?.univName ?? '';
  const serviceID = currentService?.serviceID ?? '';
  const copiedChartData = useChartSettingStore(
    (state) => state.copiedChartData
  );
  const setCopiedChartData = useChartSettingStore(
    (state) => state.setCopiedChartData
  );
  const setSelectedModel = useChartSettingStore(
    (state) => state.setSelectedModel
  );
  const {
    data: chartDatas,
    isLoading: isChartDataLoading,
    isSuccess: isChartDataSuccess,
    refetch,
  } = useGetChartDataQuery(serviceID);
  const { setChartData, postChartData, isPostChartDataSuccess } =
    useChartDataMutation();

  const containerTitle = `${univName}(${serviceID}) 차트 데이터 설정`;

  // 차트 데이터 존재 여부
  const isChartDataExist = useMemo(
    () => (chartDatas?.length ?? 0) > 0,
    [chartDatas]
  );

  // 변경사항 유무
  const hasChanges = useMemo(() => {
    const sortedOriginalData = [...copiedChartData].sort(
        (a, b) => a.modelNum - b.modelNum
      ),
      sortedChartData = [...(chartDatas ?? [])].sort(
        (a, b) => a.modelNum - b.modelNum
      );
    return (
      JSON.stringify(sortedOriginalData) !== JSON.stringify(sortedChartData)
    );
  }, [chartDatas, copiedChartData, currentService]);

  // 모델 번호 목록
  const modelNumbers = useMemo(() => {
    return (
      getDistinctColumnValues(chartDatas ?? [], 'modelNum') as number[]
    ).sort((a, b) => a - b);
  }, [chartDatas]);

  // 새로운 모델 추가
  const handleAddNewModel = useCallback(() => {
    const newModelNum = getNewNumberColumnValue(
      chartDatas ?? [],
      'modelNum',
      0
    );
    const newChartData: ChartData[] = [
      ...(chartDatas ?? []),
      getNewChartData({
        serviceID: serviceID,
        modelNum: newModelNum,
      }),
    ];
    setChartData(newChartData);
  }, [modelNumbers]);

  // 변경사항 저장 버튼 클릭 처리
  const handleSaveChanges = useCallback(async () => {
    await postChartData(chartDatas ?? []);
  }, [chartDatas]);

  /**
   * 언마운트 시
   * 변경사항을 무시하고 서비스 아이디를 변경하는 경우를 대비해 refetch,
   * 선택된 데이터 초기화
   */
  useEffect(() => {
    return () => {
      refetch();
      setSelectedModel(null);
    };
  }, [currentService]);

  useEffect(() => {
    setCopiedChartData([...(chartDatas ?? [])]);
  }, [isChartDataSuccess, isPostChartDataSuccess, currentService]);

  _return.current = {
    containerTitle,
    chartDatas,
    isChartDataExist,
    isChartDataLoading,
    modelNumbers,
    hasChanges,
    handleSaveChanges,
    handleAddNewModel,
  };
  return _return.current;
};
