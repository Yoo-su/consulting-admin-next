'use client';

import { Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';

import { useSharedStore } from '@/shared/models';

import { ChartData, useChartSettingStore } from '../models';
import { useChartDataMutation } from './use-chart-data-mutation';
import { useGetChartDataQuery } from './use-get-chart-data-query';

type UseChartSettingContainerReturn = {
  chartData: ChartData[] | undefined;
  isChartDataExist: boolean;
  isChartDataLoading: boolean;
  modelNumbers: number[];
  hasChanges: boolean;
  handleSaveBtnClick: () => void;
  handleClickAddNewModelBtn: () => void;
};
export const useChartSettingContainer = () => {
  const _return = useRef<UseChartSettingContainerReturn>();
  const currentService = useSharedStore((state) => state.currentService);
  const {
    data: chartData,
    isLoading: isChartDataLoading,
    isSuccess,
    refetch,
  } = useGetChartDataQuery(currentService?.serviceID ?? '');
  const { setChartData, postChartData } = useChartDataMutation();
  const { copiedChartData, setCopiedChartData, setSelectedModel } =
    useChartSettingStore(
      useShallow((state) => ({
        copiedChartData: state.copiedChartData,
        setCopiedChartData: state.setCopiedChartData,
        setSelectedModel: state.setSelectedModel,
      }))
    );

  // 차트 데이터 존재 여부
  const isChartDataExist = useMemo(
    () => (chartData?.length ?? 0) > 0,
    [chartData]
  );

  // 변경사항 유무
  const hasChanges = useMemo(() => {
    const sortedOriginalData = [...copiedChartData].toSorted(
        (a, b) => a.modelNum - b.modelNum
      ),
      sortedChartData = [...(chartData ?? [])].toSorted(
        (a, b) => a.modelNum - b.modelNum
      );
    return (
      JSON.stringify(sortedOriginalData) !== JSON.stringify(sortedChartData)
    );
  }, [chartData, copiedChartData, currentService]);

  // 모델 번호 목록
  const modelNumbers = useMemo(() => {
    return Array.from(
      new Set((chartData ?? []).map((item) => item.modelNum))
    ).sort((a, b) => a - b);
  }, [chartData]);

  /**
   * 새로운 모델 추가
   */
  const handleClickAddNewModelBtn = useCallback(() => {
    const newModelNum = chartData?.length ? Math.max(...modelNumbers) + 1 : 0;
    const newChartData: ChartData[] = [
      ...(chartData ?? []),
      {
        serviceID: currentService?.serviceID ?? '',
        modelNum: newModelNum,
        label: '새 레이블',
        percentage: 100,
        level: 1,
        chartLabel: '새 차트 레이블',
      },
    ];
    setChartData(newChartData);
  }, [modelNumbers]);

  /**
   * 변경사항 저장 버튼 클릭 처리리
   */
  const handleSaveBtnClick = useCallback(() => {
    toast.promise(
      postChartData({
        serviceID: currentService?.serviceID ?? '',
        chartData: chartData ?? [],
      }),
      {
        loading: (
          <Typography variant="body2">
            차트 정보를 업데이트하는 중입니다...
          </Typography>
        ),
        success: (
          <Typography variant="body2">차트정보 업데이트 완료!</Typography>
        ),
        error: (
          <Typography variant="body2">
            차트정보 업데이트 중 문제가 발생했습니다
          </Typography>
        ),
      }
    );
  }, [chartData]);

  /**
   * 컴포넌트 언마운트 처리
   * query data를 직접 수정하기 때문에 변경사항 반영 없이
   * 서비스아이디를 변경하는 경우를 위해 refetch를 호출
   */
  useEffect(() => {
    return () => {
      refetch();
      setSelectedModel(null);
      setCopiedChartData([]);
    };
  }, [currentService]);

  useEffect(() => {
    setCopiedChartData([...(chartData ?? [])]);
  }, [isSuccess, currentService]);

  _return.current = {
    chartData,
    isChartDataExist,
    isChartDataLoading,
    modelNumbers,
    hasChanges,
    handleSaveBtnClick,
    handleClickAddNewModelBtn,
  };
  return _return.current;
};
